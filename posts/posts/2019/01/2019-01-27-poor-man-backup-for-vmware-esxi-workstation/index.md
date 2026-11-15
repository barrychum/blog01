---
title: "Poor man backup for vmware esxi / workstation"
date: 2019-01-27
---

**esxi**

* * *

/etc/init.d/usbarbitrator stop mkdir -p /vmfs/volumes/USBstore001/backup

vmname=$(echo 'plex') src=$(echo '/vmfs/volumes/LocalSSD/plex') dst=$(echo '/vmfs/volumes/USBstore001/backup')

ti=$(date +"%Y%m%d%H%M") now=$ti$vmname

mkdir $dst/$now

cp $src/$vmname.vmx $dst/$now/$vmname.vmx cp $src/$vmname.nvram $dst/$now/$vmname.nvram cp $src/$vmname.vmsd $dst/$now/$vmname.vmsd

vmid=$(vim-cmd vmsvc/getallvms | grep $vmname | awk '{print $1}') vim-cmd vmsvc/snapshot.create $vmid backup 'snapshot for backup' 0 0 vmkfstools -i $src/$vmname.vmdk $dst/$now/$vmname.vmdk -d thin

snapshotid=$(vim-cmd vmsvc/snapshot.get $vmid | grep Id | awk '{print $4}' | sort -rn | head -n 1) vim-cmd vmsvc/snapshot.remove $vmid $snapshotid

**workstation**

* * *

copy "%srcpath%\\%vmname%.vmx" copy "%srcpath%\\%vmname%.vmsd" copy "%srcpath%\\%vmname%.nvram" %vmrunpath%\\vmrun -T ws snapshot "%srcpath%\\%vmname%.vmx" snapshot-%ymdHM% rem copy "%srcpath%\\%vmname%.vmdk" robocopy "%srcpath%" . "%vmname%\*.vmdk" %vmrunpath%\\vmrun -T ws deletesnapshot "%srcpath%\\%vmname%.vmx" snapshot-%ymdHM%
