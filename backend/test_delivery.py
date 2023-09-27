import json
import unittest
from app import app

class TestLogin(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        
    def test_login_success(self):
        data = {'username': 'steam01', 'password': 'sTeAmo12023'}                   # enter correct password to test
        response = self.app.post('/login', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Successfully logged in!', response.data)
        self.assertIn(b'username', response.data)
        self.assertIn(b'role', response.data)

    def test_login_missing_credentials(self):
        data = {'username': '', 'password': ''}
        response = self.app.post('/login', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Missing username or password', response.data)

    def test_login_invalid_credentials(self):
        data = {'username': 'admin', 'password': 'invalid_password'}
        response = self.app.post('/login', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'Invalid username or password', response.data)

if __name__ == '__main__':
    unittest.main()
