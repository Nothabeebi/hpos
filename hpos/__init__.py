from __future__ import unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from . import _version

__version__ = _version.__version__
