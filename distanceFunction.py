import numpy as np
 
def distance(point_x, point_y, c=2, verbose=True):
    sum_to_c = 0
    for i in range(len(point_x)):
        sum_to_c += np.power(abs(point_x[i] - point_y[i]), c)
    if verbose:
        if c==1:
            print("Manhattan Distance")
        elif c==2:
            print('Euclidian Distance')
        else:
            print("Minkowski Distance with C = {}".format(c))
    return np.power(sum_to_c, (1/c))