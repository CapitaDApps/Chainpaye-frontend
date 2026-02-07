// Performance monitoring and optimization utilities

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetric>();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  // Start timing a metric
  startTiming(name: string, metadata?: Record<string, any>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata
    });
  }

  // End timing a metric
  endTiming(name: string): number | null {
    const metric = this.metrics.get(name);
    if (!metric) return null;

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  // Get metric data
  getMetric(name: string): PerformanceMetric | null {
    return this.metrics.get(name) || null;
  }

  // Get all metrics
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Initialize performance observers
  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    try {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Navigation timing:', {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              totalTime: navEntry.loadEventEnd - navEntry.fetchStart
            });
          }
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);

      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) {
            console.warn(`Slow resource: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);

      // Observe long tasks
      if ('PerformanceObserver' in window && 'observe' in PerformanceObserver.prototype) {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
        try {
          longTaskObserver.observe({ entryTypes: ['longtask'] });
          this.observers.push(longTaskObserver);
        } catch (e) {
          // longtask not supported in all browsers
        }
      }
    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }
  }

  // Disconnect all observers
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const measureAsync = async <T>(
  name: string,
  asyncFn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> => {
  performanceMonitor.startTiming(name, metadata);
  try {
    const result = await asyncFn();
    return result;
  } finally {
    performanceMonitor.endTiming(name);
  }
};

export const measureSync = <T>(
  name: string,
  syncFn: () => T,
  metadata?: Record<string, any>
): T => {
  performanceMonitor.startTiming(name, metadata);
  try {
    const result = syncFn();
    return result;
  } finally {
    performanceMonitor.endTiming(name);
  }
};

// Memory usage monitoring
export const getMemoryUsage = (): any => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as any).memory;
  }
  return null;
};

// Bundle size analysis helper
export const logBundleSize = (componentName: string): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`Component loaded: ${componentName}`);
  }
};