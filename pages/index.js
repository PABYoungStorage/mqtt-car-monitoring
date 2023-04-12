import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";

const RabbitMQConsumer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = Stomp.client("ws://192.168.1.14:15674/ws");

    const onConnect = () => {
      client.subscribe(
        "/queue/car_data",
        (message) => {
          setMessages([...messages, message.body]);
          message.ack();
        },
        { ack: "client" }
      );
    };

    client.connect("guest", "guest", onConnect);

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Messages from RabbitMQ</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default RabbitMQConsumer;
