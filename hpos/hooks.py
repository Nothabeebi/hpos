from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "hpos"
app_title = "HPOS"
app_publisher = "Your Name"
app_description = "High Performance POS for ERPNext"
app_icon = "fa fa-shopping-cart"
app_color = "grey"
app_email = "your@email.com"
app_license = "MIT"

# Include JS/CSS files in desk.html
app_include_css = "/assets/hpos/css/pos.css"
app_include_js = "/assets/hpos/js/pos.js"

# Document Events
doc_events = {
    "POS Invoice": {
        "before_save": "hpos.pos_app.pos_app.before_pos_invoice_save"
    }
}

# Override POS View
override_doctype_class = {
    "POS Invoice": "hpos.pos_app.pos_app.CustomPOSInvoice"
}
