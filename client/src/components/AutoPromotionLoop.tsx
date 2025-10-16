import React from "react";

const messages = [
  "🍂 Autumn Promotion: 20% off all cleaning services for new clients!",
  "Book now and enjoy a sparkling home this fall!",
  "Limited time offer – hurry before it ends!",
  "Eco-friendly cleaning for a cozy autumn!"
];

export const AutoPromotionLoop: React.FC = () => {
  return (
    <section className="w-full h-10 flex items-center bg-orion-gradient text-lg font-semibold overflow-hidden">
      <div className="flex flex-row items-center animate-promo-marquee w-max whitespace-nowrap">
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 promo-shine-text">
            {msg}
          </span>
        ))}
        {/* Repeat for infinite loop */}
        {messages.map((msg, i) => (
          <span key={"repeat-"+i} className="mx-8 promo-shine-text">
            {msg}
          </span>
        ))}
      </div>
    </section>
  );
};
