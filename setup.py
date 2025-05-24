from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='hpos',
    version=version,
    description='High Performance POS for ERPNext',
    author='Your Name',
    author_email='your@email.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[],
    entry_points={
        'frappe': [
            'hpos = hpos'
        ]
    }
)
