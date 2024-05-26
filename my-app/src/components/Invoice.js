import React from 'react';
import { useLocation } from 'react-router-dom';
import { List, Typography, Layout, Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Content } = Layout;

const Invoice = () => {
  const location = useLocation();
  const { cartItems } = location.state || [];

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 10, 10);

    // Add table with cart items
    doc.autoTable({
      head: [['Product ID', 'Price', 'Size', 'Weight', 'Quantity Sold']],
      body: cartItems.map(item => [
        item.productId,
        item.price,
        item.size,
        item.weight,
        item.quantitySold
      ]),
      startY: 20
    });

    // Add signature area
    const finalY = doc.autoTable.previous.finalY + 20;
    doc.text('Manager Signature:', 10, finalY);
    doc.line(50, finalY, 150, finalY); // Signature line

    doc.save('invoice.pdf');
  };

  return (
    <Layout>
      <Content style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Typography.Title level={2}>Invoice</Typography.Title>
        {cartItems.length > 0 ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`Product ID: ${item.productId}`}
                    description={`Price: ${item.price}, Size: ${item.size}, Weight: ${item.weight}, Quantity Sold: ${item.quantitySold}`}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" onClick={handleDownloadInvoice} style={{ marginTop: '20px' }}>Download Invoice</Button>
          </>
        ) : (
          <Typography.Text>No items in cart.</Typography.Text>
        )}
      </Content>
    </Layout>
  );
};

export default Invoice;
