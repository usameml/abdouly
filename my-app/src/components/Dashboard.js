import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getSalesByMonth } from '../actions/saleActions';
import { logout } from '../actions/authActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const salesByMonth = useSelector(state => state.sales.salesByMonth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSalesByMonth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // تحديث المسار هنا إلى '/login'
  };

  const calculateProfitPercentage = (currentPrice, previousPrice) => {
    if (previousPrice === 0) return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>لوحة التحكم</h1>
        <Button type="primary" onClick={handleLogout}>تسجيل الخروج</Button>
      </div>
      <div style={styles.cardsContainer}>
        {salesByMonth.map((monthData, index) => {
          const profitPercentage = index > 0
            ? calculateProfitPercentage(monthData.totalPrice, salesByMonth[index - 1].totalPrice)
            : 0;
          const profitColor = profitPercentage > 0 ? 'green' : profitPercentage < 0 ? 'red' : 'black';
          return (
            <div key={index} style={styles.card}>
              <h2>{monthData.month}</h2>
              <p>السعر الإجمالي: MRU {monthData.totalPrice.toFixed(2)}</p>
              <p style={{ color: profitColor }}>
                نسبة الربح: {profitPercentage.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#E2EAF4',
    padding: '20px',
    margin: '10px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '200px',
  }
};

export default Dashboard;
