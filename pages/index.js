import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Car Monitoring</h1>
      <p>
        Monitor your car using MQTT system which helps you to get the live
        updates from the car
      </p>
      <button><Link href="/carMonitoring">get started</Link></button>
    </div>
  );
}
