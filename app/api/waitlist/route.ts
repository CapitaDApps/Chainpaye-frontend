import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    // Initialize Resend with API key from environment variables
    const apiKey = process.env.RESEND_API || process.env.NEXT_PUBLIC_RESEND_API;
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 503 }
      );
    }

    const body = await request.json();
    console.log("Waitlist submission received:", body);
    const { name, email, phone, tier } = body;

    // Basic validation
    if (!name || !phone) {
      console.error("Validation failed: Name or Phone missing");
      return NextResponse.json(
        { error: "Name and Phone are required" },
        { status: 400 }
      );
    }

    let resend;
    try {
      resend = new Resend(apiKey);
    } catch (initError) {
      console.error("Failed to initialize Resend:", initError);
      return NextResponse.json(
        { error: "Email service initialization failed. Please contact support." },
        { status: 503 }
      );
    }

    // Construct Admin Email (HTML)
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .header { background-color: #003DFF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 0.9em; }
            .value { font-size: 1.1em; color: #000; }
            .footer { margin-top: 20px; font-size: 0.8em; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Visa Card Request</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">WhatsApp Number</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Selected Card Tier</div>
                <div class="value">${tier || "None"}</div>
              </div>
            </div>
            <div class="footer">
              Sent from Chainpaye Website
            </div>
          </div>
        </body>
      </html>
    `;

    // Construct User Email (HTML)
    const userHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .header { background-color: #003DFF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; }
            .highlight { background-color: #f0f7ff; padding: 15px; border-left: 4px solid #003DFF; margin: 20px 0; }
            .footer { margin-top: 20px; font-size: 0.8em; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Request Received! 🎉</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for requesting the <strong>${
                tier || "Visa"
              }</strong> Card. We have successfully received your details.</p>
              
              <div class="highlight">
                <p><strong>Card Availability:</strong> Your card will be available for pickup in <strong>25 business days</strong>.</p>
                <p><strong>Next Steps:</strong> Our team will reach out to you on WhatsApp via <strong>+2348106535142</strong> for further details regarding your card.</p>
              </div>

              <h3>Request Summary:</h3>
               <div style="margin-bottom: 10px;">
                <strong>Tier:</strong> ${tier || "Standard"}
              </div>
              <div style="margin-bottom: 10px;">
                <strong>WhatsApp:</strong> ${phone}
              </div>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Chainpaye. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error("ADMIN_EMAIL is missing");
      return NextResponse.json(
        { error: "Admin email is not configured. Please contact support." },
        { status: 503 }
      );
    }
    
    console.log("Sending email to admin:", adminEmail);
    // console.log(
    //   "Using API Key:",
    //   apiKey ? `...${apiKey.slice(-4)}` : "MISSING"
    // );

    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "Chainpaye Admin <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Visa Card Request: ${name}`,
      html: adminHtmlContent,
    });

    if (adminError) {
      console.error("Admin Email Failed:", adminError);
      return NextResponse.json(
        { error: "Failed to notify admin: " + adminError.message },
        { status: 500 }
      );
    }

    // Send email to User
    // Note: In Resend Test Mode, this will FAIL if 'email' is not the registered account email.
    // We will log this error but treat the request as successful since the admin was notified.
    // const { error: userError } = await resend.emails.send({
    //   from: "Chainpaye <onboarding@resend.dev>",
    //   to: [email],
    //   subject: "We've received your Chainpaye Card Request",
    //   html: userHtmlContent,
    // });

    // if (userError) {
    //   console.warn(
    //     "User Confirmation Email Failed (likely Test Mode restriction):",
    //     userError
    //   );
    //   // We do NOT return an error here, so the user sees a success screen.
    // }

    return NextResponse.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Add a GET handler to prevent build-time issues
export async function GET() {
  return NextResponse.json({ 
    message: "Waitlist API endpoint. Use POST to submit waitlist requests." 
  });
}
