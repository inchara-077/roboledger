import { useEffect, useRef } from 'react';
import { TelemetrySocket } from '../services/websocket/client';
import { useRobotStore } from '../stores/robot-store';

export function useTelemetrySocket() {
  const updateTelemetry = useRobotStore(state => state.updateTelemetry);
  const socketRef = useRef<TelemetrySocket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new TelemetrySocket();
    }
    
    const socket = socketRef.current;
    
    socket.connect((msg) => {
      if (msg.type === 'TELEMETRY_UPDATE') {
        updateTelemetry(msg.data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [updateTelemetry]);
}
