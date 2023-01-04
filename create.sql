CREATE TABLE Player (
	Player_Id	integer NOT NULL,
	Player_Name	varchar(250) NOT NULL ,
	DOB	date NOT NULL,
	Batting_hand	varchar(250) NOT NULL,
	Bowling_skill	varchar(250),
	Country	varchar(250) NOT NULL,
    PRIMARY KEY (Player_Id)
);

CREATE TABLE Venue (
	Venue_Id	integer NOT NULL,
	Venue_Name	varchar(250) NOT NULL ,
	City	Varchar(250) NOT NULL,
	Country Varchar(250) NOT NULL,
    PRIMARY KEY (Venue_Id)
);

CREATE TABLE Team (
	Team_Id	integer NOT NULL,
	Team_Name	varchar(450) NOT NULL,
    PRIMARY KEY (Team_Id)
);


CREATE TABLE Match (
	Match_Id	integer NOT NULL,
	Team_1	integer NOT NULL,
	Team_2	integer NOT NULL,
	Match_Date DATE NOT NULL ,
	Match_Type VARCHAR(250) NOT NULL,
	Venue_Id	integer NOT NULL,
	Toss_Winner	integer NOT NULL,
	Toss_Decision Varchar(250) NOT NULL,
	Is_Super_Over CHAR(1) Check (Is_Super_Over in ('Y','N')),
    PRIMARY KEY (Match_Id),
    FOREIGN KEY (Team_1)
        REFERENCES Team(Team_Id),
    FOREIGN KEY (Team_2)
        REFERENCES Team(Team_Id),
    FOREIGN KEY (Toss_Winner)
        REFERENCES Team(Team_Id),
    FOREIGN KEY (Venue_Id)
        REFERENCES Venue(Venue_Id));


CREATE TABLE Match_Innings (
Match_Id INTEGER NOT NULL,
Innings_No Integer NOT NULL,
Batting_Team_Id Integer NOT NULL,
PRIMARY KEY(Innings_No,Match_Id),
FOREIGN KEY(Match_Id) REFERENCES Match(Match_Id),
FOREIGN KEY(batting_team_id) REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE Match_Result (
Match_Id integer NOT NULL,
Result_Type varchar(250) NOT NULL,
Result_Margin integer,
Result_Method varchar(250),
Match_Winner integer,
Man_of_the_Match integer,
PRIMARY KEY(Match_Id),
FOREIGN KEY(Match_Winner) REFERENCES Team(TEAM_ID),
FOREIGN KEY(Match_Id) REFERENCES Match(Match_Id),
FOREIGN KEY (Man_of_the_Match) REFERENCES Player(Player_Id)
);

CREATE TABLE Delivery_Details (
	Match_Id	integer NOT NULL,
	Over_No	integer NOT NULL,
	Ball_No	integer NOT NULL,
	Innings_No	integer NOT NULL,
	Striker	integer NOT NULL,
	Non_Striker	integer NOT NULL,
      Runs_Scored integer NOT NULL,
	Bowler	integer NOT NULL,	
   PRIMARY KEY (Match_Id, Over_No, Ball_No, Innings_No),
   FOREIGN KEY (Match_Id)
        REFERENCES Match(Match_Id),
    FOREIGN KEY (Striker)
        REFERENCES Player(Player_Id),
    FOREIGN KEY (Non_Striker)
        REFERENCES Player(Player_Id),
    FOREIGN KEY (Bowler)
        REFERENCES Player(Player_Id)
);


CREATE TABLE Extras (
	Match_Id	integer NOT NULL,
	Over_No	integer NOT NULL,
	Ball_No	integer NOT NULL,
	Extra_Type	VARCHAR(250),
	Extra_Runs	integer NOT NULL,
	Innings_No	integer NOT NULL,
    PRIMARY KEY (Match_Id, Over_No, Ball_No, Innings_No),
    FOREIGN KEY (Match_Id, Over_No, Ball_No, Innings_No) 
	references Delivery_Details(Match_Id, Over_No, Ball_No, Innings_No)
       );

CREATE TABLE Wicket (
	Match_Id	integer NOT NULL,
	Over_No	integer NOT NULL,
	Ball_No	integer NOT NULL,
	Player_Out	integer NOT NULL,
      Bowler      integer NOT NULL,
	Dismissal_Type Varchar(250) NOT NULL,
	Fielder	integer,
	Innings_No	integer NOT NULL,
      PRIMARY KEY (Match_Id, Over_No, Ball_No, Innings_No),
     FOREIGN KEY (Player_Out) REFERENCES Player(Player_Id),
    	FOREIGN KEY (Bowler) REFERENCES Player(Player_Id),
    	FOREIGN KEY (Fielder) REFERENCES Player(Player_Id),
    FOREIGN KEY (Match_Id, Over_No, Ball_No, Innings_No) 
	REFERENCES Delivery_Details(Match_Id, Over_No, Ball_No, Innings_No)
);


create INDEX Runs on Delivery_details using hash(runs_scored);

create index idx_striker on delivery_details(striker);

Create index non_striker_idx on delivery_details(non_striker);


