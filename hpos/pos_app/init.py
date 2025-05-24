from frappe import _

def get_dashboard_data(data):
    return {
        "fieldname": "pos_profile",
        "transactions": [
            {
                "label": _("Transactions"),
                "items": ["POS Invoice"]
            }
        ]
    }
