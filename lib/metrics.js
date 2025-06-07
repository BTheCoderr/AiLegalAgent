// Metrics and Analytics System for AI Legal Agents
// Tracks key business metrics and system performance

class MetricsLogger {
  constructor() {
    this.events = [];
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize in-memory storage for demo
    // In production, this would connect to Supabase
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ai_legal_metrics');
      this.events = stored ? JSON.parse(stored) : [];
    }
  }

  saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai_legal_metrics', JSON.stringify(this.events));
    }
  }

  async logEvent(eventType, data = {}) {
    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventType,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      ...data
    };

    this.events.push(event);
    this.saveToStorage();

    // In production, also send to Supabase
    try {
      if (process.env.SUPABASE_URL) {
        await this.sendToSupabase(event);
      }
    } catch (error) {
      console.error('Failed to send metrics to Supabase:', error);
    }

    return event;
  }

  async sendToSupabase(event) {
    // Placeholder for Supabase integration
    // const { createClient } = require('@supabase/supabase-js');
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    // await supabase.from('metrics_events').insert([event]);
  }

  // Triage Metrics
  async logTriageRequest(query, result, latency) {
    return await this.logEvent('triage_request', {
      query: query.substring(0, 100), // Truncate for privacy
      category: result.category,
      confidence: result.confidence,
      urgency: result.urgency,
      estimatedCost: result.estimatedCost,
      latency_ms: latency
    });
  }

  // QA Metrics
  async logQARequest(query, result, latency) {
    return await this.logEvent('qa_request', {
      query: query.substring(0, 100), // Truncate for privacy
      confidence: result.confidence,
      sourcesCount: result.sources?.length || 0,
      latency_ms: latency
    });
  }

  // Document Generation Metrics
  async logDocumentGenerated(docType, jurisdiction, status = 'pending') {
    return await this.logEvent('document_generated', {
      docType,
      jurisdiction,
      status
    });
  }

  async logDocumentStatusChange(docId, oldStatus, newStatus, reviewerId = null) {
    return await this.logEvent('document_status_change', {
      docId,
      oldStatus,
      newStatus,
      reviewerId
    });
  }

  // Appointment Metrics
  async logAppointmentBooked(attorneyId, clientType, appointmentType) {
    return await this.logEvent('appointment_booked', {
      attorneyId,
      clientType,
      appointmentType
    });
  }

  // User Feedback Metrics
  async logUserFeedback(context, rating, feedback = '') {
    return await this.logEvent('user_feedback', {
      context,
      rating,
      feedback: feedback.substring(0, 200) // Truncate for storage
    });
  }

  // Analytics Methods
  getMetricsByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.events.filter(event => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= start && eventDate <= end;
    });
  }

  getTriageMetrics(days = 7) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const triageEvents = this.events.filter(event => 
      event.eventType === 'triage_request' && 
      new Date(event.timestamp) >= cutoff
    );

    return {
      totalRequests: triageEvents.length,
      requestsPerDay: triageEvents.length / days,
      averageLatency: triageEvents.reduce((sum, evt) => sum + (evt.latency_ms || 0), 0) / triageEvents.length || 0,
      categoryBreakdown: this.getCategoryBreakdown(triageEvents),
      urgencyBreakdown: this.getUrgencyBreakdown(triageEvents)
    };
  }

  getQAMetrics(days = 7) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const qaEvents = this.events.filter(event => 
      event.eventType === 'qa_request' && 
      new Date(event.timestamp) >= cutoff
    );

    return {
      totalRequests: qaEvents.length,
      requestsPerDay: qaEvents.length / days,
      averageLatency: qaEvents.reduce((sum, evt) => sum + (evt.latency_ms || 0), 0) / qaEvents.length || 0,
      averageConfidence: qaEvents.reduce((sum, evt) => sum + (evt.confidence || 0), 0) / qaEvents.length || 0,
      averageSources: qaEvents.reduce((sum, evt) => sum + (evt.sourcesCount || 0), 0) / qaEvents.length || 0
    };
  }

  getDocumentMetrics(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const docGenEvents = this.events.filter(event => 
      event.eventType === 'document_generated' && 
      new Date(event.timestamp) >= cutoff
    );

    const docStatusEvents = this.events.filter(event => 
      event.eventType === 'document_status_change' && 
      new Date(event.timestamp) >= cutoff
    );

    const approved = docStatusEvents.filter(evt => evt.newStatus === 'approved').length;
    const rejected = docStatusEvents.filter(evt => evt.newStatus === 'rejected').length;

    return {
      totalGenerated: docGenEvents.length,
      generatedPerDay: docGenEvents.length / days,
      totalApproved: approved,
      totalRejected: rejected,
      approvalRate: docGenEvents.length > 0 ? (approved / docGenEvents.length * 100) : 0,
      jurisdictionBreakdown: this.getJurisdictionBreakdown(docGenEvents)
    };
  }

  getAppointmentMetrics(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const appointmentEvents = this.events.filter(event => 
      event.eventType === 'appointment_booked' && 
      new Date(event.timestamp) >= cutoff
    );

    return {
      totalBooked: appointmentEvents.length,
      bookedPerDay: appointmentEvents.length / days,
      attorneyBreakdown: this.getAttorneyBreakdown(appointmentEvents)
    };
  }

  getFeedbackMetrics(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const feedbackEvents = this.events.filter(event => 
      event.eventType === 'user_feedback' && 
      new Date(event.timestamp) >= cutoff
    );

    const positiveRatings = feedbackEvents.filter(evt => evt.rating === 'positive').length;
    const totalRatings = feedbackEvents.length;

    return {
      totalFeedback: totalRatings,
      positiveRate: totalRatings > 0 ? (positiveRatings / totalRatings * 100) : 0,
      contextBreakdown: this.getContextBreakdown(feedbackEvents)
    };
  }

  // Helper methods for breakdowns
  getCategoryBreakdown(events) {
    const breakdown = {};
    events.forEach(evt => {
      const category = evt.category || 'Unknown';
      breakdown[category] = (breakdown[category] || 0) + 1;
    });
    return breakdown;
  }

  getUrgencyBreakdown(events) {
    const breakdown = {};
    events.forEach(evt => {
      const urgency = evt.urgency || 'Unknown';
      breakdown[urgency] = (breakdown[urgency] || 0) + 1;
    });
    return breakdown;
  }

  getJurisdictionBreakdown(events) {
    const breakdown = {};
    events.forEach(evt => {
      const jurisdiction = evt.jurisdiction || 'Unknown';
      breakdown[jurisdiction] = (breakdown[jurisdiction] || 0) + 1;
    });
    return breakdown;
  }

  getAttorneyBreakdown(events) {
    const breakdown = {};
    events.forEach(evt => {
      const attorney = evt.attorneyId || 'Unknown';
      breakdown[attorney] = (breakdown[attorney] || 0) + 1;
    });
    return breakdown;
  }

  getContextBreakdown(events) {
    const breakdown = {};
    events.forEach(evt => {
      const context = evt.context || 'Unknown';
      breakdown[context] = (breakdown[context] || 0) + 1;
    });
    return breakdown;
  }

  // Export/Import for admin purposes
  exportMetrics() {
    return {
      exportedAt: new Date().toISOString(),
      totalEvents: this.events.length,
      events: this.events
    };
  }

  importMetrics(data) {
    if (data.events && Array.isArray(data.events)) {
      this.events = [...this.events, ...data.events];
      this.saveToStorage();
      return true;
    }
    return false;
  }
}

// Singleton instance
let metricsLogger = null;

export function getMetricsLogger() {
  if (!metricsLogger) {
    metricsLogger = new MetricsLogger();
  }
  return metricsLogger;
}

export default MetricsLogger; 