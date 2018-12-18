import auth
from model import Player, Wizdata, Account, Room, Zone, Mob, Mobresponses, Roomexit
from main import app, db

from flask import render_template, request, session
from sqlalchemy.sql import text


@app.route("/")
@auth.requires_auth
def home():
    #store blocks in session cookie
    #session only grabs one immortal from the account, might be an issue
    #if people have multiple imms in their account?
    res = list(db.session.get_bind().execute(text("""
        select w.blockastart, w.blockaend, w.blockbstart, w.blockbend, w.office
        from account a
        inner join player p on p.account_id = a.account_id
        inner join wizdata w on w.player_id = p.id
        where a.name = :name"""), name=request.authorization.username))
    session['aStart'] = res[0].blockastart
    session['bStart'] = res[0].blockbstart
    session['aEnd'] = res[0].blockaend
    session['bEnd'] = res[0].blockbend
    session['office'] = res[0].office
    return render_template("home.html")


@app.route("/zones")
@auth.requires_auth
def zones():
    zones = Zone.query.all()
    return render_template("zones.html", zones=zones)

#Rooms

@app.route("/rooms")
@auth.requires_auth
def rooms():
    # I very much dislike ORMs just for this reason -- you need to learn a new
    # language for doing something you already necessarily know how to do --
    # and then it's still harder to do than in SQL.
    # res = (Account.queryV
    #         .join(Player, Account.account_id == Player.account_id)
    #         .join(Wizdata, Wizdata.player_id == Player.id)
    #         .join(Room, Room.vnum )
    #         .filter(Room.vnum >= Wizdata.blockastart and Room.vnum <= Wizdata.blockaend
    #             or Room.vnum >= Wizdata.blockbstart and Room.vnum <= Wizdata.blockbend)
    #         .filter(Account.name == request.authorization.username))
    # print(res)
    res = db.session.get_bind().execute(text("""
        select r.vnum, r.name
        from room r where (r.vnum between :bStart and :bEnd or r.vnum between :aStart and :aEnd)
        """), bStart=session['bStart'], bEnd=session['bEnd'], 
        aStart=session['aStart'], aEnd=session['aEnd'])
    return render_template("rooms.html", rooms=res)

@app.route("/rooms/<int:vnum>")
@auth.requires_auth
def room(vnum):
    #check if they can access this vnum
    if not (session['bStart'] <= vnum <= session['bEnd']
        or session['aStart'] <= vnum <= session['aEnd']
        or vnum == session['office']):
        return render_template("badaccess.html")

    room = Room.query.filter_by(vnum=str(vnum)).first()
    exits = db.session.query(Roomexit).filter_by(vnum=str(vnum))
    exitnames = list()
    for e in exits:
        exitnames.append(Room.query.filter_by(vnum=e.destination).first().name)
    return render_template("room.html", r=room, e=zip(exits,exitnames))

@app.route("/updateroom", methods=['POST'])
@auth.requires_auth
def updateRoom():
    vnum = int(request.form.get('vnum'))
    #check if they can access this vnum
    if not (session['bStart'] <= vnum <= session['bEnd']
        or session['aStart'] <= vnum <= session['aEnd']
        or vnum == session['office']):
        return render_template("badaccess.html")
    
    room = Room.query.filter_by(vnum=str(vnum)).first()
    room.name = request.form.get('name')
    room.description = request.form.get('description')
    db.session.commit()
    exits = db.session.query(Roomexit).filter_by(vnum=str(vnum))
    exitnames = list()
    for e in exits:
        exitnames.append(Room.query.filter_by(vnum=e.destination).first().name)
    return render_template("room.html", r=room, e=zip(exits,exitnames))

#Mobs

@app.route("/mobs")
@auth.requires_auth
def mobs():
    res = db.session.get_bind().execute(text("""
        select m.vnum, m.name
        from mob m where (m.vnum between :bStart and :bEnd or m.vnum between :aStart and :aEnd)
        """), bStart=session['bStart'], bEnd=session['bEnd'], 
        aStart=session['aStart'], aEnd=session['aEnd'])
    return render_template("mobs.html", mobs=res)

@app.route("/mobs/<int:vnum>")
@auth.requires_auth
def mob(vnum):
    #check if they can access this vnum
    if not (session['bStart'] <= vnum <= session['bEnd']
        or session['aStart'] <= vnum <= session['aEnd']
        or vnum == session['office']):
        return render_template("badaccess.html")

    mob = Mob.query.filter_by(vnum=str(vnum)).first()
    response = Mobresponses.query.filter_by(vnum=str(vnum)).first()
    return render_template("mob.html", m=mob, r=response)

@app.route("/updatemob", methods=['POST'])
@auth.requires_auth
def updateMob():
    vnum = int(request.form.get('vnum'))
    #check if they can access this vnum
    if not (session['bStart'] <= vnum <= session['bEnd']
        or session['aStart'] <= vnum <= session['aEnd']
        or vnum == session['office']):
        return render_template("badaccess.html")
    
    mob = Mob.query.filter_by(vnum=str(vnum)).first()
    mob.name = request.form.get('name')
    mob.short_desc = request.form.get('short_desc')
    mob.long_desc = request.form.get('long_desc')
    response = Mobresponses.query.filter_by(vnum=str(vnum)).first()
    if response is None:
        response = Mobresponses(vnum=vnum, response="")
        db.session.add(response)
    response.response = request.form.get('response')
    db.session.commit()
    return render_template("mob.html", m=mob, r=response)