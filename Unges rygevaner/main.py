import matplotlib as mpl
import numpy as np
import streamlit as st
import pandas as pd
import altair as alt

# Open streamlit app
st.title("Unges rygevaner")

# import the file smoking.txt as a tab delimited file
df = pd.read_csv("smoking.txt", sep="\t")

# set the column names
df.columns = ["age", "FEV1", "height", "gender", "smokingstatus", "weight"]

# get the amount of smokers and nonsmokers
smokers = df[df["smokingstatus"] == 1]
nonsmokers = df[df["smokingstatus"] == 0]
st.write("Smokers: " + str(smokers.shape[0]) + ". Nonsmokers: " + str(nonsmokers.shape[0]))

# get female and male datasets
males = df[df["gender"] == 1]
females = df[df["gender"] == 0]

# display a chart of nonsmokers and smokers based on gender
female_smokers, female_nonsmokers, male_smokers, male_nonsmokers = (
    smokers[smokers["gender"] == 0],
    nonsmokers[nonsmokers["gender"] == 0],
    smokers[smokers["gender"] == 1],
    nonsmokers[nonsmokers["gender"] == 1],

)
smoker_data = pd.DataFrame(
    [[female_smokers.shape[0], 0, 0, 0], [0, female_nonsmokers.shape[0], 0, 0], [0, 0, male_smokers.shape[0], 0], [0, 0, 0, male_nonsmokers.shape[0]]],
    columns=["Female smokers", "Female nonsmokers", "Male smokers", "Male nonsmokers"]
)
st.bar_chart(smoker_data)

# display average FEV1 for nonsmokers and smokers
smoker_FEV1 = smokers["FEV1"].sum() / smokers.shape[0]
nonsmoker_FEV1 = nonsmokers["FEV1"].sum() / smokers.shape[0]
st.write(
    "Smoker FEV1 average: " + str(np.round(smoker_FEV1, decimals=3)) + 
    ". Non-smoker FEV1 average: " + str(np.round(nonsmoker_FEV1, decimals=3))
)

# display average weight for male and female smokers and nonsmokers
male_smoker_weight, male_nonsmoker_weight, female_smoker_weight, female_nonsmoker_weight = (
    male_smokers["weight"].sum() / male_smokers.shape[0],
    male_nonsmokers["weight"].sum() / male_nonsmokers.shape[0],
    female_smokers["weight"].sum() / female_smokers.shape[0],
    female_nonsmokers["weight"].sum() / female_nonsmokers.shape[0]
)
weight_data = pd.DataFrame(
    [[male_smoker_weight, 0, 0, 0], [0, male_nonsmoker_weight, 0, 0], [0, 0, female_smoker_weight, 0], [0, 0, 0, female_nonsmoker_weight]],
    columns=["Male smoker average weight", "Male nonsmoker avrage weight", "Female smoker average weight", "Female nonsmoker average weight"]
)
st.write(weight_data)

# display graph of FEV1 vs. age
line_data = df[["FEV1", "age"]]
chart = alt.Chart(line_data).mark_line().encode(
    x=alt.X("FEV1"),
    y=alt.Y("age"),
).properties(title="FEV1 vs. age")
st.write("FEV1 vs. age")
st.altair_chart(chart)

# display graph of FEV1 vs. weight
line_data = df[["FEV1", "weight"]]
chart = alt.Chart(line_data).mark_line().encode(
    x=alt.X("FEV1"),
    y=alt.Y("weight"),
).properties(title="FEV1 vs. weight")
st.write("FEV1 vs. weight")
st.altair_chart(chart)

# display graph of FEV1 vs. height
line_data = df[["FEV1", "height"]]
chart = alt.Chart(line_data).mark_line().encode(
    x=alt.X("FEV1"),
    y=alt.Y("height"),
).properties(title="FEV1 vs. height")
st.write("FEV1 vs. height")
st.altair_chart(chart)

# new section for selecting data
st.header("Select data")

# radio buttons to select male and/or female
checkedMale = st.checkbox("Male")
checkedFemale = st.checkbox("Female")
# get data based on checked boxes
data = pd.DataFrame()
if (checkedMale):
    data = males
if (checkedFemale):
    data = females
if (checkedMale and checkedFemale):
    data = df

# display graph of Male/Female vs. FEV1 based on checkboxes
if (not data.empty):
    line_data = data
    chart = alt.Chart(line_data).mark_line().encode(
        x=alt.X("FEV1"),
        y=alt.Y("age"),
    ).properties(title="FEV1 vs. age")
    st.write("FEV1 vs. age")
    st.altair_chart(chart)