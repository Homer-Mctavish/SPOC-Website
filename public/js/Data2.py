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


sns.set(rc={'figure.figsize':(15,8)})
gaben = sns.barplot(x='Event', y='Attendees', data=df3)
gaben.tick_params(labelsize=10)
figu = gaben.get_figure()
figu.savefig('bar.png')


# In[ ]:




