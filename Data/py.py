import os
import numpy as np

for i in np.arange(0.5, 1.01, 0.01):
    a = round(i, 2)
    print(a)
    b = int(a*100)
    print(b)
    oldpath  = "data" + str(a) +".csv"
    newpath = "data" + str(b) +".csv"
    os.rename(oldpath, newpath) 
