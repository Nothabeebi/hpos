from __future__ import unicode_literals
from frappe import _

def get_data():
    return {
        'fieldname': 'pos_profile',
        'transactions': [
            {
                'label': _('Transactions'),
                'items': ['POS Invoice']
            }
        ]
    }
