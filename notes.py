# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, abort, make_response
import jwt
app_url = '/kapralam/notes/api'
app = Flask(__name__)
app.debug = True
app.secret_key = 'hfuiddvd3og43y9y3ufhuif'

users = {
'kapralov': '12345ABC',
'balcewicz': 'alf123',
}

notes ={'kapralov': [],
'balcewicz':[],
}
user = {}


@app.route(app_url + '/login', methods = ['POST'])
def login():
   if not request.json or not 'login' in request.json or not 'password' in request.json:
      abort(400)

   user['login'] = request.json['login']
   user['password'] = request.json['password']

   if user['login'] in users and users[user['login']] == user['password']:
      token = jwt.encode({'login': user['login']}, 'secret', algorithm = 'HS256')
      return jsonify({'token': token})
   else:
      abort(404)

   
@app.route(app_url + '/notes', methods = ['POST'])
def addNote():
   if not 'token' in request.json:
      abort(401)
   if not request.json or not 'note' in request.json or not 'label' in request.json or not 'tags' in request.json:
      abort(404)
   else:
      token = request.json['token']
      try:
         decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
      except jwt.InvalidTokenError:
         abort(401)
      idN = 0
      if len(notes[user['login']]) == 0:
         idN = 0
      else:
         idN = notes[user['login']][-1]['id'] + 1
      tags = request.json['tags'].split(' ')
      note = {
        'label': request.json['label'],
        'tags': tags,
        'note': request.json['note'],
        'id':  idN,
      }
      notes[user['login']].append(note)
      return jsonify({'note': note}), 201


@app.route(app_url + '/notes/<idN>', methods = ['GET'])
def getNote(idN):
   token = request.headers['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   for note in notes[user['login']]:
      if note['id'] == int(idN):
         return jsonify({'note': note})
   abort(404)


@app.route(app_url + '/notes/<idN>', methods = ['DELETE'])
def delNote(idN):
   token = request.headers['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   for note in notes[user['login']]:
      if note['id'] == int(idN):
         notes[user['login']].remove(note)
         return jsonify({'result': True})
   abort(404)


@app.route(app_url + '/notes/<idN>', methods = ['PUT'])
def editNote(idN):
   token = request.json['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   for note in notes[user['login']]:
      if note['id'] == int(idN):
         notes[user['login']].remove(note)
         tags = request.json['tags'].split(' ')
         note = {
            'label': request.json['label'],
            'tags': tags,
            'note': request.json['note'],
            'id':  int(idN),
         }
         notes[user['login']].append(note)
         return jsonify({'note': note})
   abort(404)


@app.route(app_url + '/notes/label/<label>', methods = ['GET'])
def getAllNotesWithLabel(label):
   token = request.headers['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   notesWithLabel = []
   for note in notes[user['login']]:
      if note['label'] == label:
         notesWithLabel.append(note)
   return jsonify({'notes': notesWithLabel})


@app.route(app_url + '/notes/tags/<tag>', methods = ['GET'])
def getAllNotesWithTag(tag):
   token = request.headers['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   notesWithTag = []
   for note in notes[user['login']]:
      for noteTag in note['tags']:
         if noteTag == tag:
            notesWithTag.append(note)
            break
   return jsonify({'notes': notesWithTag}) 


@app.route(app_url + '/allNotes', methods = ['GET'])
def getAllNotes():
   token = request.headers['token']
   try:
      decode = jwt.decode(token, 'secret', algorithms = ['HS256'])
   except jwt.InvalidTokenError:
         abort(401)
   return jsonify({'allNotes': notes[user['login']]})


@app.errorhandler(401)
def invalidToken(error):
   return make_response(jsonify({'error': 'Invalid token'}), 401)



       
