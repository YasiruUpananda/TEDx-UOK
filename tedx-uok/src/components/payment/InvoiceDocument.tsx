
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Register fonts if needed, or use standard fonts
// Font.register({ family: 'Inter', src: 'path/to/font.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#EB0028', // TEDx Red
        paddingBottom: 20,
    },
    // Logo style removed in favor of inline composite styles
    invoiceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#333',
    },
    invoiceMeta: {
        marginTop: 10,
        textAlign: 'right',
    },
    section: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        color: '#666',
        width: 100,
    },
    value: {
        flex: 1,
    },
    table: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#eee',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 8,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    colDesc: {
        flex: 2,
    },
    colQty: {
        flex: 1,
        textAlign: 'center',
    },
    colPrice: {
        flex: 1,
        textAlign: 'right',
    },
    totalSection: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    totalLabel: {
        width: 100,
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: 'bold',
    },
    totalValue: {
        width: 100,
        textAlign: 'right',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#999',
        fontSize: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 20,
    },
});

interface InvoiceProps {
    payment: {
        payment_id: string | number;
        amount: number;
        currency: string;
        created_at: string;
        status: string;
    };
    registration: {
        full_name: string;
        email: string;
        ticket_type: string | null;
        registration_id: number;
    };
}

const InvoiceDocument: React.FC<InvoiceProps> = ({ payment, registration }) => {
    const invoiceDate = new Date(payment.created_at).toLocaleDateString();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${payment.payment_id.toString().padStart(5, '0')}`;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        {/* TEDx Logo Composite */}
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#EB0028', fontSize: 24, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' }}>TED</Text>
                            <Text style={{ color: '#EB0028', fontSize: 14, fontWeight: 'bold', fontFamily: 'Helvetica-Bold', marginTop: 2 }}>x</Text>
                            <Text style={{ color: '#000000', fontSize: 24, fontWeight: 'bold', fontFamily: 'Helvetica-Bold', marginLeft: 4 }}>UoK</Text>
                        </View>
                        <Text style={{ marginTop: 5 }}>University of Kelaniya</Text>
                        <Text>Kelaniya, Sri Lanka</Text>
                        <Text>info@tedxuok.com</Text>
                    </View>
                    <View style={styles.invoiceMeta}>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                        <Text>Number: {invoiceNumber}</Text>
                        <Text>Date: {invoiceDate}</Text>
                        <Text>Status: {payment.status?.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Bill To */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Bill To:</Text>
                    <Text>{registration.full_name}</Text>
                    <Text>{registration.email}</Text>
                </View>

                {/* Line Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDesc}>Description</Text>
                        <Text style={styles.colQty}>Quantity</Text>
                        <Text style={styles.colPrice}>Amount</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.colDesc}>
                            TEDxUOK 2026 Ticket - {registration.ticket_type || 'Standard Entry'}
                        </Text>
                        <Text style={styles.colQty}>1</Text>
                        <Text style={styles.colPrice}>
                            {payment.currency} {payment.amount.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Total */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal:</Text>
                        <Text style={styles.totalValue}>{payment.currency} {payment.amount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalLabel, { fontSize: 12, color: '#EB0028' }]}>Total:</Text>
                        <Text style={[styles.totalValue, { fontSize: 12, fontWeight: 'bold' }]}>
                            {payment.currency} {payment.amount.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for being part of TEDxUOK!</Text>
                    <Text style={{ marginTop: 5 }}>This is a computer-generated invoice and requires no signature.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
