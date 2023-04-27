import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";

const RabbitMQConsumer = () => {
  const [messages, setMessages] = useState(
    {
      username:"anish",
      status:true,
      carspeed:100,
    }
  );

  useEffect(() => {
    const client = Stomp.client("ws://192.168.1.5:15674/ws");

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

  console.log(messages);
  
  return (
    <div>
      <h1>Messages from RabbitMQ</h1>
      <ul>
        {
          Object.keys(messages).map((msg, i) => (
            <li key={i}>{msg}:{messages[msg]}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default RabbitMQConsumer;
