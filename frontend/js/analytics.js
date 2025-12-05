// Simple Analytics Tracker
class PortfolioAnalytics {
    constructor() {
        this.API_URL = 'http://localhost:5000/api/analytics';
        this.visitorId = this.getOrCreateVisitorId();
        this.sessionId = this.getOrCreateSessionId();
        this.sessionStart = Date.now();
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackSessionDuration();
        this.trackBeforeUnload();
    }

    // Generate or get visitor ID
    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }

    // Generate or get session ID
    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    // Detect device type
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    // Get browser name
    getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('Opera')) return 'Opera';
        return 'Unknown';
    }

    // Get OS
    getOS() {
        const ua = navigator.userAgent;
        if (ua.includes('Win')) return 'Windows';
        if (ua.includes('Mac')) return 'MacOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    // Track page view
    async trackPageView() {
        try {
            const data = {
                pageUrl: window.location.pathname,
                pageTitle: document.title,
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                referrer: document.referrer,
                device: this.getDeviceType(),
                browser: this.getBrowser(),
                os: this.getOS()
            };

            await fetch(`${this.API_URL}/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Analytics tracking failed:', error);
        }
    }

    // Track session duration
    trackSessionDuration() {
        setInterval(() => {
            const duration = Math.floor((Date.now() - this.sessionStart) / 1000);
            this.updateSessionDuration(duration);
        }, 30000); // Update every 30 seconds
    }

    // Update session duration
    async updateSessionDuration(duration) {
        try {
            await fetch(`${this.API_URL}/session/${this.sessionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ duration })
            });
        } catch (error) {
            console.error('Session update failed:', error);
        }
    }

    // Track before page unload
    trackBeforeUnload() {
        window.addEventListener('beforeunload', () => {
            const duration = Math.floor((Date.now() - this.sessionStart) / 1000);
            
            // Use sendBeacon for reliable tracking on page unload
            const data = JSON.stringify({ duration });
            navigator.sendBeacon(`${this.API_URL}/session/${this.sessionId}`, data);
        });
    }
}

// Initialize analytics
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioAnalytics();
    });
} else {
    new PortfolioAnalytics();
}
