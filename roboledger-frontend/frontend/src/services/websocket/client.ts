export class TelemetrySocket {
  private ws: WebSocket | null = null;
  private url = 'ws://localhost:8000/ws/telemetry';
  private reconnectTimer: number | null = null;

  connect(onMessage: (data: any) => void) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.url);
    
    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        onMessage(payload);
      } catch (err) {
        console.error("Failed to parse telemetry socket message:", err);
      }
    };
    
    this.ws.onclose = () => {
      console.log('TelemetrySocket closed. Reconnecting in 3s...');
      this.reconnectTimer = window.setTimeout(() => this.connect(onMessage), 3000);
    };

    this.ws.onerror = (err) => {
      console.error("TelemetrySocket error:", err);
      this.ws?.close();
    };
  }
  
  disconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }
    if (this.ws) {
      this.ws.onclose = null; // prevent auto reconnect
      this.ws.close();
      this.ws = null;
    }
  }
}
