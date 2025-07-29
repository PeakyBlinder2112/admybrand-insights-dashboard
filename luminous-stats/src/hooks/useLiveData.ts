
import { useState, useEffect } from 'react';
import { MetricData } from '@/lib/mockData';

export function useLiveData(initialMetrics: MetricData[]) {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        let newValue = metric.value;
        let newChange = metric.change;

        if (typeof metric.value === 'string' && metric.value.includes('₹')) {
          // Revenue updates every 3 seconds by +₹2,000 to ₹5,000 (only increase)
          const numericValue = parseFloat(metric.value.replace(/[₹L]/g, ''));
          const changeAmount = 2000 + Math.random() * 3000; // +₹2,000 to ₹5,000
          const updatedValue = numericValue * 100000 + changeAmount; // Convert from Lakh to actual value
          
          newValue = `₹${(updatedValue / 100000).toFixed(1)}L`;
          newChange = (changeAmount / (numericValue * 100000)) * 100;
        } else if (typeof metric.value === 'string' && metric.value.includes('%') && !metric.value.includes('↑')) {
          // Percentage values - only increase slightly, 2 decimal places max
          const numericValue = parseFloat(metric.value.replace('%', ''));
          const changeAmount = Math.random() * 0.2; // +0 to +0.2% variation (only positive)
          const updatedValue = Math.max(0, numericValue + changeAmount);
          newValue = `${updatedValue.toFixed(2)}%`;
          newChange = (changeAmount / numericValue) * 100;
        } else if (typeof metric.value === 'string' && metric.value.includes(',')) {
          // User count increases by +1 to +3 every 3 seconds (only increase)
          const numericValue = parseInt(metric.value.replace(/,/g, ''));
          const increment = 1 + Math.floor(Math.random() * 3); // +1 to +3
          const updatedValue = numericValue + increment;
          
          newValue = updatedValue.toLocaleString();
          newChange = ((updatedValue - numericValue) / numericValue) * 100;
        } else if (typeof metric.value === 'string' && metric.value.includes('↑')) {
          // Growth indicators - only increase slightly, 2 decimal places max
          const numericValue = parseFloat(metric.value.replace(/[↑%]/g, ''));
          const changeAmount = Math.random() * 0.3; // +0 to +0.3% variation (only positive)
          const updatedValue = Math.max(0, numericValue + changeAmount);
          newValue = `↑${updatedValue.toFixed(2)}%`;
          newChange = (changeAmount / numericValue) * 100;
        }

        return {
          ...metric,
          value: newValue,
          change: isFinite(newChange) ? Number(newChange.toFixed(2)) : 0, // Fix Infinity% issue and limit to 2 decimal places
          trend: newChange > 0 ? 'up' as const : 'neutral' as const
        };
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
