--- 
layout: post
title: Script to make Debian Package from Python code.
created: 1253204547
---
I spent a couple of hours trying to figure out how to make a Debian package from a Python package, which would work properly and use python-support to provide the correct bytecodes when multiple versions of Python are installed on a target machine.  

I didn't find this to be very interesting work, so I commissioned Михаил Подгурский to write the script for me.  It makes a Debian package from a pure Python package.  (Am I in danger of turning PHB?)

I'm releasing it under the <a href='http://www.python.org/psf/license/'>Python Licence</a>.  Enjoy.

<code type="bash">
#!/bin/sh

##############################################
###     Default configuration settings     ###
##############################################
PACKAGE_DIR=./example
PACKAGE_VERSION=0.0.4
PACKAGE_SHORT_DESCRIPTION="The Example package"
PACKAGE_LONG_DESCRIPTION="Description of the Example package"

MAINTAINER_NAME="John Smit"
MAINTAINER_EMAIL="john@example.com"
MAINTAINER_GPG_KEY="$MAINTAINER_NAME (Personal Information) <$MAINTAINER_EMAIL>"

#############################################
### End of default configuration settings ###
#############################################

set -e -x

PACKAGE_NAME=`basename $PACKAGE_DIR`
WORK_DIR=`mktemp -dt $PACKAGE_NAME.XXXX`
RESULT_DIR=`pwd`
SOURCE_DIR=$WORK_DIR/$PACKAGE_NAME-$PACKAGE_VERSION
BUILD_TIME=`LC_ALL=POSIX date -R`

DEBIAN_DIR=$SOURCE_DIR/debian

mkdir -p $SOURCE_DIR $DEBIAN_DIR

cp -R $PACKAGE_DIR $SOURCE_DIR

# Creating the Debian Package Settings

echo 4 > $DEBIAN_DIR/compat
echo 2 > $DEBIAN_DIR/pycompat

cat > $DEBIAN_DIR/control <<EOF
Source: $PACKAGE_NAME
Priority: optional
Maintainer: $MAINTAINER_NAME <$MAINTAINER_EMAIL>
Build-Depends: debhelper (>= 7), python, python-support (>= 0.3)
Standards-Version: PACKAGE_VERSION
Section: python

Package: $PACKAGE_NAME
Section: python
Architecture: all
Depends: \${python:Depends}
Description: $PACKAGE_SHORT_DESCRIPTION
 $PACKAGE_LONG_DESCRIPTION
EOF

cat > $DEBIAN_DIR/changelog <<EOF
example ($PACKAGE_VERSION) unstable; urgency=low  
  
  * Initial release  
  
 -- $MAINTAINER_GPG_KEY $BUILD_TIME
EOF

cat > $DEBIAN_DIR/rules <<EOF
#!/usr/bin/make -f
#export DH_VERBOSE=1

DEBPACKAGE     = example
DESTDIR        = debian/\${DEBPACKAGE}
PREFIX         = usr

clean:
	dh_testdir
	dh_testroot
	rm -rf build
	dh_clean

build:

install: build
	dh_testdir
	dh_testroot
	dh_installdirs
	mkdir -p \$(DESTDIR)/\$(PREFIX)/share/python-support/
	cp -R ./\$(DEBPACKAGE) \$(DESTDIR)/\$(PREFIX)/share/python-support/\$(DEBPACKAGE)

binary-arch: build install

binary-indep: build install
	dh_testdir
	dh_testroot
	dh_installchangelogs
	dh_installdocs
	dh_installexamples
	dh_pysupport
	dh_compress
	dh_fixperms
	dh_installdeb
	dh_gencontrol
	dh_md5sums
	dh_builddeb

binary: binary-indep binary-arch

.PHONY: build clean binary-indep binary-arch binary install configure
EOF

chmod +x $DEBIAN_DIR/rules

# Build deb package
cd $SOURCE_DIR 
dpkg-buildpackage || true

cp $WORK_DIR/*.deb $RESULT_DIR

echo "All done."
</code>
