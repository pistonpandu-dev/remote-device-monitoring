export interface PerformanceMetric {
  name: string;
  value: number;
  unit?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface PerformanceTiming {
  dns: number;
  connect: number;
  request: number;
  response: number;
  dom: number;
  load: number;
  total: number;
}

export interface MemoryUsage {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}
