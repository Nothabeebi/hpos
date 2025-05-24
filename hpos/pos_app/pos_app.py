from __future__ import unicode_literals
import frappe
from frappe import _

def get_pos_view():
    return {
        "view": "HPOSView",
        "js": "hpos.pos_app.pos_app.js",
        "css": "hpos.pos_app.pos_app.css",
        "template": "hpos/templates/pos.html"
    }

def get_pos_invoice_fields():
    return [
        {"fieldname": "hpos_totals", "fieldtype": "JSON", "label": "HPOS Totals", "insert_after": "items"}
    ]

def before_pos_invoice_save(doc, method, args):
    # Calculate totals for thermal print
    total_mrp = 0
    total_discount = 0
    
    for item in doc.items:
        if item.get("mrp"):
            total_mrp += item.mrp * item.qty
        if item.get("discount_amount"):
            total_discount += item.discount_amount
    
    doc.hpos_totals = {
        "total_mrp": total_mrp,
        "total_discount": total_discount,
        "total_amount": doc.grand_total
    }

def get_pos_invoice_print_format():
    return {
        "print_format": "HPOS Thermal Print",
        "print_format_module": "hpos"
    }
