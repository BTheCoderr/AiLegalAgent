import { useState, useEffect } from 'react';
import { getMetricsLogger } from '../lib/metrics.js';

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); // Default to 7 days
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadMetrics = async () => {
    try {
      const metricsLogger = getMetricsLogger();
      
      const data = {
        triage: metricsLogger.getTriageMetrics(timeRange),
        qa: metricsLogger.getQAMetrics(timeRange),
        documents: metricsLogger.getDocumentMetrics(timeRange === 7 ? 30 : timeRange), // Use 30 days for docs
        appointments: metricsLogger.getAppointmentMetrics(timeRange === 7 ? 30 : timeRange),
        feedback: metricsLogger.getFeedbackMetrics(timeRange === 7 ? 30 : timeRange),
        summary: {
          totalEvents: metricsLogger.events.length,
          timeRange: timeRange
        }
      };

      setMetrics(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Failed to load metrics:', error);
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return Math.round(num * 100) / 100;
  };

  const formatPercentage = (num) => {
    if (num === undefined || num === null || isNaN(num)) return '0%';
    return `${Math.round(num)}%`;
  };

  const exportMetrics = () => {
    const metricsLogger = getMetricsLogger();
    const exportData = metricsLogger.exportMetrics();
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-legal-metrics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Metrics Dashboard</h1>
              <p className="text-gray-600 mt-2">
                AI Legal Agents for Startups - Performance Analytics
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Last 24 hours</option>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <button
                onClick={exportMetrics}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Export Data
              </button>
              <button
                onClick={loadMetrics}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Events</p>
              <p className="text-2xl font-bold text-blue-900">{metrics?.summary?.totalEvents || 0}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Time Range</p>
              <p className="text-2xl font-bold text-green-900">{timeRange} days</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Active Features</p>
              <p className="text-2xl font-bold text-purple-900">5</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">System Status</p>
              <p className="text-2xl font-bold text-orange-900">🟢 Active</p>
            </div>
          </div>
        </div>

        {/* Triage Metrics */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Triage System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Requests</p>
              <p className="text-3xl font-bold text-blue-900">{metrics?.triage?.totalRequests || 0}</p>
              <p className="text-sm text-blue-600">
                {formatNumber(metrics?.triage?.requestsPerDay || 0)} per day
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Avg Latency</p>
              <p className="text-3xl font-bold text-green-900">
                {formatNumber(metrics?.triage?.averageLatency || 0)}ms
              </p>
              <p className="text-sm text-green-600">Response time</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Categories</p>
              <p className="text-3xl font-bold text-purple-900">
                {Object.keys(metrics?.triage?.categoryBreakdown || {}).length}
              </p>
              <p className="text-sm text-purple-600">Active categories</p>
            </div>
          </div>

          {/* Category Breakdown */}
          {metrics?.triage?.categoryBreakdown && Object.keys(metrics.triage.categoryBreakdown).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Category Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metrics.triage.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{category}</span>
                    <span className="text-blue-600 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Urgency Breakdown */}
          {metrics?.triage?.urgencyBreakdown && Object.keys(metrics.triage.urgencyBreakdown).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Urgency Levels</h3>
              <div className="flex space-x-4">
                {Object.entries(metrics.triage.urgencyBreakdown).map(([urgency, count]) => (
                  <div key={urgency} className={`flex-1 p-3 rounded-lg text-center ${
                    urgency === 'High' ? 'bg-red-50 text-red-700' :
                    urgency === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    <p className="font-bold text-lg">{count}</p>
                    <p className="text-sm">{urgency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* QA Metrics */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 Q&A System</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Queries</p>
              <p className="text-3xl font-bold text-blue-900">{metrics?.qa?.totalRequests || 0}</p>
              <p className="text-sm text-blue-600">
                {formatNumber(metrics?.qa?.requestsPerDay || 0)} per day
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Avg Confidence</p>
              <p className="text-3xl font-bold text-green-900">
                {formatPercentage(metrics?.qa?.averageConfidence || 0)}
              </p>
              <p className="text-sm text-green-600">Response quality</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Avg Sources</p>
              <p className="text-3xl font-bold text-purple-900">
                {formatNumber(metrics?.qa?.averageSources || 0)}
              </p>
              <p className="text-sm text-purple-600">Citations per response</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Avg Latency</p>
              <p className="text-3xl font-bold text-orange-900">
                {formatNumber(metrics?.qa?.averageLatency || 0)}ms
              </p>
              <p className="text-sm text-orange-600">Response time</p>
            </div>
          </div>
        </div>

        {/* Document Generation Metrics */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📄 Document Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Generated</p>
              <p className="text-3xl font-bold text-blue-900">{metrics?.documents?.totalGenerated || 0}</p>
              <p className="text-sm text-blue-600">
                {formatNumber(metrics?.documents?.generatedPerDay || 0)} per day
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-900">{metrics?.documents?.totalApproved || 0}</p>
              <p className="text-sm text-green-600">Review completed</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Rejected</p>
              <p className="text-3xl font-bold text-red-900">{metrics?.documents?.totalRejected || 0}</p>
              <p className="text-sm text-red-600">Needs revision</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Approval Rate</p>
              <p className="text-3xl font-bold text-purple-900">
                {formatPercentage(metrics?.documents?.approvalRate || 0)}
              </p>
              <p className="text-sm text-purple-600">Quality score</p>
            </div>
          </div>

          {/* Jurisdiction Breakdown */}
          {metrics?.documents?.jurisdictionBreakdown && Object.keys(metrics.documents.jurisdictionBreakdown).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">By Jurisdiction</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(metrics.documents.jurisdictionBreakdown).map(([jurisdiction, count]) => (
                  <div key={jurisdiction} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 capitalize">{jurisdiction.replace('_', ' ')}</span>
                    <span className="text-blue-600 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Appointments & User Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Appointments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Appointments</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Booked</p>
                <p className="text-3xl font-bold text-blue-900">{metrics?.appointments?.totalBooked || 0}</p>
                <p className="text-sm text-blue-600">
                  {formatNumber(metrics?.appointments?.bookedPerDay || 0)} per day
                </p>
              </div>
              
              {metrics?.appointments?.attorneyBreakdown && Object.keys(metrics.appointments.attorneyBreakdown).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">By Attorney</h3>
                  <div className="space-y-2">
                    {Object.entries(metrics.appointments.attorneyBreakdown).map(([attorney, count]) => (
                      <div key={attorney} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-gray-900">{attorney}</span>
                        <span className="text-blue-600 font-bold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Feedback */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">💬 User Feedback</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Positive Rate</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatPercentage(metrics?.feedback?.positiveRate || 0)}
                </p>
                <p className="text-sm text-green-600">User satisfaction</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Feedback</p>
                <p className="text-3xl font-bold text-blue-900">{metrics?.feedback?.totalFeedback || 0}</p>
                <p className="text-sm text-blue-600">Responses collected</p>
              </div>

              {metrics?.feedback?.contextBreakdown && Object.keys(metrics.feedback.contextBreakdown).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">By Context</h3>
                  <div className="space-y-2">
                    {Object.entries(metrics.feedback.contextBreakdown).map(([context, count]) => (
                      <div key={context} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-gray-900">{context}</span>
                        <span className="text-blue-600 font-bold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Targets */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Performance Targets (Sprint 5)</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{metrics?.triage?.totalRequests || 0}/200</p>
              <p className="text-sm text-gray-600">Cases Triaged</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics?.triage?.totalRequests || 0) / 200 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-green-900">{metrics?.documents?.totalGenerated || 0}/100</p>
              <p className="text-sm text-gray-600">Documents Generated</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics?.documents?.totalGenerated || 0) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-900">0/20</p>
              <p className="text-sm text-gray-600">Active Attorneys</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-900">
                {formatPercentage(metrics?.feedback?.positiveRate || 0)}/80%
              </p>
              <p className="text-sm text-gray-600">Positive Feedback</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics?.feedback?.positiveRate || 0) / 80 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 