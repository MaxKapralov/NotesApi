# -*- coding: utf-8 -*-
from flask import Flask, render_template, send_from_directory
app_url = '/kapralam/sesja/notes'
app = Flask(__name__)
app.debug = True
app.secret_key = 'hfuiddvd3og43y9y3ufhuifdfserf'

@app.route(app_url)
def natesAPI():
   return render_template('index.html')

@app.route('/kapralam/sesja/styles.css')
def css():
   return send_from_directory('templates', 'styles.css')

@app.route('/kapralam/sesja/loginCtrl.js')
def NotesLoginCtrl():
   return send_from_directory('templates/js', 'loginCtrl.js')

@app.route('/kapralam/sesja/app.js')
def notesApp():
   return send_from_directory('templates/js', 'app.js')

@app.route('/kapralam/sesja/login.html')
def Login():
   return send_from_directory('templates', 'login.html')

@app.route('/kapralam/sesja/mainCtrl.js')
def mainCtrl():
   return send_from_directory('templates/js', 'mainCtrl.js')

@app.route('/kapralam/sesja/addNewNote.html')
def addNewNote():
   return send_from_directory('templates', 'addNewNote.html')

@app.route('/kapralam/sesja/search.html')
def search():
   return send_from_directory('templates', 'search.html')

@app.route('/kapralam/sesja/myNotes.html')
def myNotes():
   return send_from_directory('templates', 'myNotes.html')

@app.route('/kapralam/sesja/newNoteCtrl.js')
def newNoteCtrl():
   return send_from_directory('templates/js', 'newNoteCtrl.js')

@app.route('/kapralam/sesja/searchCtrl.js')
def searchCtrl():
   return send_from_directory('templates/js', 'searchCtrl.js')


@app.route('/kapralam/sesja/showNote.html')
def showNote():
   return send_from_directory('templates', 'showNote.html')

@app.route('/kapralam/sesja/showNoteCtrl.js')
def showNoteCtrl():
   return send_from_directory('templates/js', 'showNoteCtrl.js')

@app.route('/kapralam/sesja/editNote.html')
def editNote():
   return send_from_directory('templates', 'editNote.html')


@app.route('/kapralam/sesja/editNoteCtrl.js')
def editNoteCtrl():
   return send_from_directory('templates/js', 'editNoteCtrl.js')

@app.route('/kapralam/sesja/allNotesCtrl.js')
def allNotesCtrl():
   return send_from_directory('templates/js', 'allNotesCtrl.js')

