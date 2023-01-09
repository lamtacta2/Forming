import pandas as pd

csv_05 = pd.read_csv('NodeS4R_05_node_output.csv')
csv_06 = pd.read_csv('NodeS4R_06_node_output.csv')
csv_07 = pd.read_csv('NodeS4R_07_node_output.csv')
csv_08 = pd.read_csv('NodeS4R_08_node_output.csv')
csv_09 = pd.read_csv('NodeS4R_09_node_output.csv')
csv_10 = pd.read_csv('NodeS4R_10_node_output.csv')

csv_05[['delta_z']] = 0.5
csv_06[['delta_z']] = 0.6
csv_07[['delta_z']] = 0.7
csv_08[['delta_z']] = 0.8
csv_09[['delta_z']] = 0.9
csv_10[['delta_z']] = 1.0

columns = ['step','x_coord','y_coord','delta_z','U3']
train_valid_data = pd.DataFrame(csv_05[columns])
train_valid_data = train_valid_data.append(csv_10[columns],ignore_index=True)
train_valid_data = train_valid_data.append(csv_08[columns],ignore_index=True)
train_valid_data = train_valid_data.append(csv_09[columns],ignore_index=True)
train_valid_data = train_valid_data.append(csv_06[columns],ignore_index=True)
# train_valid_data.to_csv('train_valid_051008_06.csv',index=False)
# train_valid_data = train_valid_data.append(csv_09[columns],ignore_index=True)
train_valid_data.to_csv('train_valid_05100809_06.csv',index=False)

test_06 = pd.DataFrame(csv_06[columns])
test_06.to_csv('test_06.csv',index=False)

test_09 = pd.DataFrame(csv_09[columns])
test_09.to_csv('test_09.csv',index=False)

test_07 = pd.DataFrame(csv_07[columns])
test_07.to_csv('test_07.csv',index=False)