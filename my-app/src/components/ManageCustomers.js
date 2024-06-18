import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, Typography, Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, addCustomer, getCustomerSales } from '../actions/customerActions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Logonuzun yolunu buraya ekleyin

const { Title } = Typography;

const ManageCustomers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customer.customers);
  const customerSales = useSelector(state => state.customer.customerSales); // Fetch sales from state
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [isSalesModalVisible, setIsSalesModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleAddCustomer = () => {
    dispatch(addCustomer({ name: customerName }));
    setIsCustomerModalVisible(false);
    setCustomerName('');
  };

  const handleViewSales = (customerId) => {
    setSelectedCustomerId(customerId);
    dispatch(getCustomerSales(customerId));
    setIsSalesModalVisible(true);
  };

  const handleDownloadSales = (customerId) => {
    const salesData = customerSales[customerId]?.sales || [];
    const doc = new jsPDF();

    // Add company information in English
    doc.addImage(logo, 'PNG', 10, 10, 50, 30); // Add logo
    doc.text("Boutique Ehle Abdouly - BEA", 70, 20);
    doc.text("tel: 27235533 - 38228289", 70, 30);
    doc.text("Caraffour Mosquee Maroc", 70, 40);

    doc.text("Customer Sales", 20, 60);

    const tableColumn = ["Product Name", "Price", "Paid Amount", "Remaining Amount", "Total"];
    const tableRows = [];

    salesData.forEach(sale => {
      const saleData = [
        sale.productName,
        sale.price,
        sale.paidAmount,
        sale.remainingAmount,
        sale.price - sale.paidAmount
      ];
      tableRows.push(saleData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      styles: {
        font: "helvetica", // Use a standard font for English
        halign: "left", // Align left for LTR
        textDirection: 'ltr', // LTR text direction
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      }
    });

    // Manager signature
    doc.text("Manager", 20, doc.autoTable.previous.finalY + 30);
    doc.text("_________________", 20, doc.autoTable.previous.finalY + 35);

    doc.save("customer_sales.pdf");
  };

  const customerColumns = [
    {
      title: 'اسم العميل',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleViewSales(record._id)}>عرض المبيعات</Button>
          <Button onClick={() => handleDownloadSales(record._id)}>تنزيل المبيعات</Button>
        </>
      ),
    },
  ];

  const salesColumns = [
    {
      title: 'اسم المنتج',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'المبلغ المدفوع',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
    },
    {
      title: 'المبلغ المتبقي',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
    },
    {
      title: 'الإجمالي',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => record.price - record.paidAmount,
    },
  ];

  const selectedCustomerSales = customerSales[selectedCustomerId] || { sales: [], totalPaidAmount: 0, totalRemainingAmount: 0 };

  return (
    <div>
      <Title level={3}>إدارة العملاء</Title>
      <Button type="primary" onClick={() => setIsCustomerModalVisible(true)}>إضافة عميل</Button>
      <Table dataSource={customers} columns={customerColumns} rowKey="_id" />

      <Modal
        title="إضافة عميل"
        visible={isCustomerModalVisible}
        onOk={handleAddCustomer}
        onCancel={() => setIsCustomerModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="اسم العميل">
            <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="مبيعات العميل"
        visible={isSalesModalVisible}
        onOk={() => setIsSalesModalVisible(false)}
        onCancel={() => setIsSalesModalVisible(false)}
        width={800}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="إجمالي المبلغ المدفوع">{selectedCustomerSales.totalPaidAmount}</Descriptions.Item>
          <Descriptions.Item label="إجمالي المبلغ المتبقي">{selectedCustomerSales.totalRemainingAmount}</Descriptions.Item>
        </Descriptions>
        <Table dataSource={selectedCustomerSales.sales} columns={salesColumns} rowKey="_id" pagination={false} />
      </Modal>
    </div>
  );
};

export default ManageCustomers;
