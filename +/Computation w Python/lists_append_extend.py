L1 = [1, 2, 3]
L2 = [4, 5, 6]

print(f"L1 = {L1}")
print(f"L2 = {L2}")
print("Append L2 to L1:")

L1.append(L2)

print(L1, "\n")

print("Extend L1 with L2:")

L1.extend(L2)

print(L1)
