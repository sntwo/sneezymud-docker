import sys
import crypt
# Takes an input of (username, password) 
# returns sneezy style hash
print(crypt.crypt(sys.argv[2], sys.argv[1])[:10])