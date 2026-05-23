import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MarketTickerItem } from "../types";

const INITIAL_TICKERS: MarketTickerItem[] = [
  { id: "1", symbol: "NIFTY 50", price: "22,419.35", change: "+148.55", changePercent: "+0.67%", isUp: true },
  { id: "2", symbol: "BANK NIFTY", price: "48,115.50", change: "-210.30", changePercent: "-0.43%", isUp: false },
  { id: "3", symbol: "SENSEX", price: "73,878.15", change: "+496.10", changePercent: "+0.68%", isUp: true },
  { id: "4", symbol: "GOLD MCX", price: "72,830.00", change: "+540.00", changePercent: "+0.75%", isUp: true },
  { id: "5", symbol: "BTC/INR", price: "5,824,400", change: "+114,800", changePercent: "+2.01%", isUp: true },
  { id: "6", symbol: "USD/INR", price: "83.48", change: "-0.12", changePercent: "-0.14%", isUp: false },
];

export function LiveTicker() {
  const [tickers, setTickers] = useState<MarketTickerItem[]>(INITIAL_TICKERS);

  // Subly simulate fluctuation of prices to make the applet feel premium & live
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((item) => {
          // 30% chance to update a single ticker item
          if (Math.random() > 0.3) return item;

          const rawPriceStr = item.price.replace(/,/g, "");
          const currentPrice = parseFloat(rawPriceStr);
          const percentChange = (Math.random() - 0.5) * 0.001; // max 0.05% change
          const newPrice = currentPrice * (1 + percentChange);

          const changeVal = newPrice - currentPrice;
          const isUp = changeVal >= 0;
          
          let formattedPrice = "";
          if (item.symbol === "USD/INR") {
            formattedPrice = newPrice.toFixed(4);
          } else if (item.symbol === "GOLD MCX" || item.symbol === "BTC/INR") {
            formattedPrice = Math.round(newPrice).toLocaleString("en-IN");
          } else {
            formattedPrice = newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          const pct = (percentChange * 100).toFixed(2);
          const displayPct = (percentChange >= 0 ? "+" : "") + pct + "%";
          const displayChange = (percentChange >= 0 ? "+" : "") + changeVal.toFixed(2);

          return {
            ...item,
            price: formattedPrice,
            change: displayChange,
            changePercent: displayPct,
            isUp,
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Repeat twice for infinite marquee effect matching Tailwind class animate-marquee
  const duplicatedTickers = [...tickers, ...tickers, ...tickers];

  return (
    <div className="w-full bg-[#030712] border-b border-gold-400/20 py-2.5 overflow-hidden sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Live Indicator Pillar */}
        <div className="flex items-center gap-1.5 mr-6 shrink-0 bg-navy-900 border border-gold-400/30 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-mono font-medium text-gold-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Demat Desk
        </div>

        {/* Marquee viewport */}
        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee flex gap-10 whitespace-nowrap">
            {duplicatedTickers.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-2 hover:bg-navy-900/50 px-3 py-1 rounded transition-colors duration-200 cursor-default"
              >
                <span className="text-[12px] font-semibold text-slate-300 font-display">
                  {item.symbol}
                </span>
                <span className="text-[12px] font-mono font-medium text-slate-100">
                  {item.price}
                </span>
                <span
                  className={`flex items-center text-[10px] font-mono leading-none font-bold py-0.5 px-1 rounded ${
                    item.isUp
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-rose-400 bg-rose-500/10"
                  }`}
                >
                  {item.isUp ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {item.changePercent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
