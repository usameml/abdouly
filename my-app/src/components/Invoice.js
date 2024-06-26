import React from 'react';
import { useLocation } from 'react-router-dom';
import { List, Typography, Layout, Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Logonuzun yolunu buraya ekleyin

const { Content } = Layout;

const Invoice = () => {
  const location = useLocation();
  const { cartItems } = location.state || [];

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add company logo
    doc.addImage(logo, 'PNG', 10, 10, 50, 30); // Logoyu ekle
    doc.text('Boutique Ehle Abdouly - BEA', 70, 20);
    doc.text('tel: 27235533 - 38228289', 70, 30);
    doc.text('Caraffour Mosquee Maroc', 70, 40);

    doc.text('Invoice', 10, 60);

    // Add table with cart items
    doc.autoTable({
      head: [['Product ID', 'Product Name', 'Price', 'Size', 'Weight', 'Quantity Sold', 'Customer Name', 'Paid Amount', 'Remaining Amount']],
      body: cartItems.map(item => [
        item.productId,
        item.productName,
        item.price,
        item.size,
        item.weight,
        item.quantitySold,
        item.customerName,
        item.paidAmount,
        item.remainingAmount
      ]),
      startY: 70
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
                    title={`Product ID: ${item.productId},  اسم المنتج: ${item.productName}`}
                    description={`Price: ${item.price}, Size: ${item.size}, Weight: ${item.weight}, Quantity Sold: ${item.quantitySold}, Customer Name: ${item.customerName}, Paid Amount: ${item.paidAmount}, Remaining Amount: ${item.remainingAmount}`}
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
