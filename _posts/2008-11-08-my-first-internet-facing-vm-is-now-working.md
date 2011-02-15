--- 
layout: post
title: My first internet-facing VM is now working :-)
created: 1226161604
---
In order to give a VM (created with virt-manager) a public, reachable IP address I had to add a bridged interface.

First, I needed to install the bridge-utils on the vm-host.
<code>
aptitude install bridge-utils


</code>
Then I needed to amend my /etc/network/interfaces file on the vm-host, and reboot.  I left my eth0 settings in place.  They didn't seem to do any harm.  
<code>
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet static
        address <public ip>
        netmask <netmask>
        network <network>
        broadcast <broadcast address>
        gateway <gateway>
        # dns-* options are implemented by the resolvconf package, if installed
        dns-nameservers <nameserver ip>
        dns-search <domain>

auto br0
iface br0 inet static
        bridge_ports eth0
        bridge_stp off
        bridge_maxwait 5
        address <public ip>
        netmask <netmask>
        network <network>
        broadcast <broadcast address>
        gateway <gateway>
        # dns-* options are implemented by the resolvconf package, if installed
        dns-nameservers <nameserver ip>
        dns-search <domain>


</code>
I was now able to add a second, bridged, interface to the virtual machine and configure it with its own public IP address.  I then tested that I could ssh into my VM from the internet - everything was fine :-)
