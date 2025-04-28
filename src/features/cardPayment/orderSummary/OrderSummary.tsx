import s from "./OrderSummary.module.css";

export const OrderSummary = () => {
  return (
    <div className={s.container}>
      <div className={s.orderInfo}>
        <div className={s.infoRow}>
          <span>Order info:</span>
          <span>&lt;= 100 char.</span>
        </div>
        <div className={s.infoRow}>
          <span>Description:</span>
          <span>&lt;= 400 char.</span>
        </div>
      </div>

      <div className={s.productItem}>
        <div className={s.productDetails}>
          <h3 className={s.productTitle}>
            Lunar Professional Smart Skin Compact Powder
          </h3>
          <p className={s.productMeta}>Пудра для лица</p>
        </div>
      </div>

      <div className={s.orderTotal}>
        <div className={s.totalRow}>
          <span className={s.totalLabel}>5 days free</span>
        </div>
        <div className={s.totalRow}>
          <span className={s.totalLabel}>then 299.99 USD per 30 days</span>
        </div>
      </div>
    </div>
  );
};
