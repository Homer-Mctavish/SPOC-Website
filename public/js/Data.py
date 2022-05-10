#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# In[2]:


df1 = pd.read_csv('out.csv')
df2 = pd.read_csv('out2.csv')
df3 = pd.read_csv('out3.csv')
df4 = pd.read_csv('out4.csv')


# In[4]:


row, col=df4.shape
Weekdays=["Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday", "Sunday"]
df4.insert(col,"Weekdays",Weekdays, True)


# In[5]:


sns.set(rc={'figure.figsize':(15,8)})
gabe = sns.lineplot(x='Weekdays', y='Logins', data=df4)
gabe.tick_params(labelsize=10)
fig = gabe.get_figure()
fig.savefig('line.png')

