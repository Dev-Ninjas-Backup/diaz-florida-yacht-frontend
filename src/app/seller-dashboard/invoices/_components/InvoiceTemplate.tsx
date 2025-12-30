import React from 'react';
import { InvoiceRecord } from '../data/invoiceData';

interface InvoiceTemplateProps {
  invoice: InvoiceRecord;
}

const InvoiceTemplate = React.forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  ({ invoice }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          color: '#000000',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: '40px',
            borderBottom: '2px solid #333',
            paddingBottom: '20px',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', verticalAlign: 'top' }}>
                  <h1
                    style={{
                      fontSize: '36px',
                      fontWeight: 'bold',
                      margin: '0 0 10px 0',
                      color: '#000',
                    }}
                  >
                    INVOICE
                  </h1>
                  <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
                    Florida Yacht
                  </p>
                </td>
                <td
                  style={{
                    width: '50%',
                    textAlign: 'right',
                    verticalAlign: 'top',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 5px 0',
                    }}
                  >
                    Invoice ID
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: '0 0 15px 0',
                      fontFamily: 'monospace',
                    }}
                  >
                    {invoice.stripeInvoiceId}
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Date:{' '}
                    {new Date(invoice.createdAt).toLocaleDateString('en-US')}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bill To & Status */}
        <div style={{ marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', verticalAlign: 'top' }}>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#666',
                      margin: '0 0 10px 0',
                    }}
                  >
                    BILL TO
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: '0 0 5px 0',
                      color: '#000',
                    }}
                  >
                    {invoice.user.name}
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    {invoice.user.email}
                  </p>
                </td>
                <td
                  style={{
                    width: '50%',
                    textAlign: 'right',
                    verticalAlign: 'top',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#666',
                      margin: '0 0 10px 0',
                    }}
                  >
                    STATUS
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 16px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      backgroundColor:
                        invoice.status === 'PAID'
                          ? '#dcfce7'
                          : invoice.status === 'UPCOMING'
                            ? '#dbeafe'
                            : invoice.status === 'PAST_DUE'
                              ? '#fef3c7'
                              : '#fee2e2',
                      color:
                        invoice.status === 'PAID'
                          ? '#166534'
                          : invoice.status === 'UPCOMING'
                            ? '#1e40af'
                            : invoice.status === 'PAST_DUE'
                              ? '#92400e'
                              : '#991b1b',
                    }}
                  >
                    {invoice.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Items */}
        <table
          style={{
            width: '100%',
            marginBottom: '30px',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                }}
              >
                DESCRIPTION
              </th>
              <th
                style={{
                  textAlign: 'right',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                }}
              >
                PERIOD
              </th>
              <th
                style={{
                  textAlign: 'right',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                }}
              >
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '16px 8px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0',
                    color: '#000',
                  }}
                >
                  {invoice.subscription.plan.title}
                </p>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {invoice.subscription.plan.planType}
                </p>
              </td>
              <td
                style={{
                  textAlign: 'right',
                  padding: '16px 8px',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                {invoice.subscription.plan.billingPeriodMonths} months
              </td>
              <td
                style={{
                  textAlign: 'right',
                  padding: '16px 8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                ${(invoice.amount / 100).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Total */}
        <div style={{ marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '60%' }}></td>
                <td style={{ width: '40%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td
                          style={{
                            padding: '10px 0',
                            fontSize: '14px',
                            color: '#666',
                          }}
                        >
                          Subtotal
                        </td>
                        <td
                          style={{
                            padding: '10px 0',
                            textAlign: 'right',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          ${(invoice.amount / 100).toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td
                          style={{
                            padding: '10px 0',
                            fontSize: '14px',
                            color: '#666',
                          }}
                        >
                          Tax
                        </td>
                        <td
                          style={{
                            padding: '10px 0',
                            textAlign: 'right',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          $0.00
                        </td>
                      </tr>
                      <tr style={{ borderTop: '2px solid #333' }}>
                        <td
                          style={{
                            padding: '15px 0',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#000',
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            padding: '15px 0',
                            textAlign: 'right',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#000',
                          }}
                        >
                          ${(invoice.amount / 100).toFixed(2)}{' '}
                          {invoice.currency.toUpperCase()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Info */}
        {invoice.paidAt && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              padding: '15px',
              marginBottom: '30px',
            }}
          >
            <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>
              <span style={{ fontWeight: 'bold' }}>Payment Received:</span>{' '}
              {new Date(invoice.paidAt).toLocaleDateString('en-US')}
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid #ddd',
            paddingTop: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            Thank you for your business!
          </p>
          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
            Subscription ID: {invoice.subscription.stripeSubscriptionId}
          </p>
        </div>
      </div>
    );
  },
);

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
