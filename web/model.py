from main import db

from flask_sqlalchemy import SQLAlchemy

class Zone(db.Model):
    zone_nr = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    zone_name = db.Column(db.String(255), unique=True, nullable=False)
    zone_enabled = db.Column(db.Integer)
    bottom = db.Column(db.Integer)
    top = db.Column(db.Integer)
    reset_mode = db.Column(db.Integer)
    lifespan = db.Column(db.Integer)
    age = db.Column(db.Integer)
    util_flag = db.Column(db.Integer)

    def __repr__(self):
        return "<Name: {}>".format(self.zone_name)


class Account(db.Model):
    account_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    email = db.Column(db.String(80), nullable=True)
    passwd = db.Column(db.String(13), nullable=True)
    name = db.Column(db.String(80), nullable=True)
    birth = db.Column(db.Integer, nullable=True)
    term = db.Column(db.Integer, nullable=True)
    time_adjust = db.Column(db.Integer, nullable=True)
    flags = db.Column(db.Integer, nullable=True)
    last_logon = db.Column(db.Integer, nullable=True)
    multiplay_limit = db.Column(db.Integer)
    # players = db.relationship('Player', backref='Account', lazy=True, foreign_keys='account_id')

    def __repr__(self):
        return "<Name: {}>".format(self.name)

class Wizdata(db.Model):
    player_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    setsev = db.Column(db.Integer, nullable=True)
    office = db.Column(db.Integer, nullable=True)
    blockastart = db.Column(db.Integer, nullable=True)
    blockaend = db.Column(db.Integer, nullable=True)
    blockbstart = db.Column(db.Integer, nullable=True)
    blockbend = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return "<Id: {}>".format(self.player_id)

class Room(db.Model):
    vnum = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)
    z = db.Column(db.Integer)
    name = db.Column(db.String(127))
    description = db.Column(db.String())
    zone = db.Column(db.Integer)
    room_flag = db.Column(db.Integer)
    sector = db.Column(db.Integer)
    teletime = db.Column(db.Integer)
    teletarg = db.Column(db.Integer)
    telelook = db.Column(db.Integer)
    river_speed = db.Column(db.Integer)
    river_dir = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    height = db.Column(db.Integer)
    spec = db.Column(db.Integer)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

class Roomexit(db.Model):
    vnum = db.Column(db.Integer, primary_key=True)
    direction = db.Column(db.Integer)
    name = db.Column(db.String(127))
    description = db.Column(db.String())
    type_ = db.Column('type', db.Integer)
    condition_flag = db.Column(db.Integer)
    lock_difficulty = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    key_num = db.Column(db.Integer)
    destination = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

class Player(db.Model):
    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(80))
    talens = db.Column(db.Integer)
    title = db.Column(db.String())
    account_id = db.Column(db.Integer)
    guild_id = db.Column(db.Integer)
    guildrank = db.Column(db.Integer)
    load_room = db.Column(db.Integer)
    last_logon = db.Column(db.Integer)
    nutrition = db.Column(db.Integer)

    def __repr__(self):
        return "<Name: {}>".format(self.name)


class Mob(db.Model):
    vnum = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(127))
    short_desc = db.Column(db.String(127))
    long_desc = db.Column(db.String(255))
    description = db.Column(db.String())
    actions = db.Column(db.Integer)
    affects = db.Column(db.Integer)
    faction = db.Column(db.Integer)
    fact_perc = db.Column(db.Integer)
    letter = db.Column(db.String())
    attacks = db.Column(db.Float)
    class_ = db.Column('class', db.Integer)
    level = db.Column(db.Integer)
    tohit = db.Column(db.Integer)
    ac = db.Column(db.Float)
    hpbonus = db.Column(db.Float)
    damage_level = db.Column(db.Float)
    damage_precision = db.Column(db.Integer)
    gold = db.Column(db.Integer)
    race = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    height = db.Column(db.Integer)
    str_ = db.Column('str', db.Integer)
    bra = db.Column(db.Integer)
    con = db.Column(db.Integer)
    dex = db.Column(db.Integer)
    agi = db.Column(db.Integer)
    intel = db.Column(db.Integer)
    wis = db.Column(db.Integer)
    foc = db.Column(db.Integer)
    per = db.Column(db.Integer)
    cha = db.Column(db.Integer)
    kar = db.Column(db.Integer)
    spe = db.Column(db.Integer)
    pos = db.Column(db.Integer)
    def_position = db.Column(db.Integer)
    sex = db.Column(db.Integer)
    spec_proc = db.Column(db.Integer)
    skin = db.Column(db.Integer)
    vision = db.Column(db.Integer)
    can_be_seen = db.Column(db.Integer)
    max_exist = db.Column(db.Integer)
    local_sound = db.Column(db.String())
    adjacent_sound = db.Column(db.String())

    def __repr__(self):
        return "<Name: {}>".format(self.name)

class Mobresponses(db.Model):
    vnum = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    response = db.Column(db.String())

    def __repr__(self):
        return "<Vnum: {}>".format(self.vnum)




