frappe.provide("erpnext.pos");
frappe.provide("erpnext.accounts.dimensions");

erpnext.pos.HPOS = class HPOS extends erpnext.pos.POS {
    setup_defaults() {
        super.setup_defaults();
        this.customer = "Cash Customer";
        this.pos_profile.default_customer = "Cash Customer";
        this.payment_method = "Cash";
    }

    make_payment() {
        if (!this.payment_method) {
            this.payment_method = "Cash";
        }
        super.make_payment();
    }

    render_item_list() {
        super.render_item_list();
        // Add custom fields to item cards
        this.$item_list.find(".item-card").each((i, el) => {
            const $el = $(el);
            const item_code = $el.attr("data-item-code");
            const item = this.items_by_name[item_code];
            
            // Add MRP and other fields if they exist
            if (item.mrp) {
                $el.find(".item-code").after(`
                    <div class="item-mrp text-muted small">
                        MRP: ${format_currency(item.mrp, this.currency)}
                    </div>
                `);
            }
            
            if (item.discount_percentage) {
                $el.find(".item-code").after(`
                    <div class="item-discount text-muted small">
                        Discount: ${item.discount_percentage}%
                    </div>
                `);
            }
        });
    }

    render_invoice() {
        super.render_invoice();
        
        // Add MRP totals to invoice summary
        let total_mrp = 0;
        this.frm.doc.items.forEach(item => {
            if (item.mrp) {
                total_mrp += item.mrp * item.qty;
            }
        });
        
        let total_discount = 0;
        this.frm.doc.items.forEach(item => {
            if (item.discount_amount) {
                total_discount += item.discount_amount;
            }
        });
        
        this.$invoice_summary.find(".tax-area").before(`
            <div class="summary-row">
                <span>Total MRP</span>
                <span>${format_currency(total_mrp, this.currency)}</span>
            </div>
            <div class="summary-row">
                <span>Total Discount</span>
                <span>${format_currency(total_discount, this.currency)}</span>
            </div>
        `);
    }

    make_invoice() {
        return super.make_invoice().then(invoice => {
            // Add MRP and discount totals to the invoice print
            let total_mrp = 0;
            let total_discount = 0;
            
            invoice.items.forEach(item => {
                if (item.mrp) {
                    total_mrp += item.mrp * item.qty;
                }
                if (item.discount_amount) {
                    total_discount += item.discount_amount;
                }
            });
            
            invoice.hpos_totals = {
                total_mrp: total_mrp,
                total_discount: total_discount,
                total_amount: invoice.total
            };
            
            return invoice;
        });
    }
};

frappe.views.HPOSView = class HPOSView extends frappe.views.POSView {
    show() {
        if (!this.pos) {
            this.pos = new erpnext.pos.HPOS({
                doctype: "POS Invoice",
                frm: this.page.frm,
                wrapper: this.page.wrapper,
                items_wrapper: this.page.items_wrapper,
                invoice_wrapper: this.page.invoice_wrapper,
                barcode_scan_field: this.page.barcode_scan_field
            });
        }
        
        super.show();
    }
};
