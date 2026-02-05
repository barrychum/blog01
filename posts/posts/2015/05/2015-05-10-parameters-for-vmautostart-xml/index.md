---
title: "Parameters for vmAutoStart.xml"
date: 2015-05-10
categories: 
  - "esxi"
  - "vmware"
  - "vmware-workstation"
---

  
| StartPolicy | Specifies the virtual machine start policy you want to modify. |  |
| --- | --- | --- |
| StartAction | Specify a start action for virtual machines. | It can be None or PowerOn. |
| StartOrder | Specify a number to define the virtual machines start order. |  |
| StartDelay | Specify a default start delay in seconds. |  |
| StopAction | Specify the default action of the virtual machine when the server stops. | None, Suspend, PowerOff, and GuestShutDown. |
| StopDelay | Specify the default stop delay in seconds. |  |
| WaitForHeartBeat | Indicate whether the virtual machine should start after receiving a heartbeat, ignore heartbeats and start after the startDelay has elapsed ($true), or follow the system default before powering on ($false). When a virtual machine is next in the start order, |
