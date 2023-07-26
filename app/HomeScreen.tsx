import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [update, setUpdate] = useState(false);

  const [data, setData] = useState([]);

  const addPerson = () => {
    setData((current) => [
      ...current,
      {
        name: name,
        age: age,
      },
    ]);
  };

  const updatePerson = () => {
    data.find((person) => {
      if (person.name == updateName) {
        person.name = name;
        person.age = age;
      }
    });
    setUpdate(false);
    console.log(data);
  };

  const deletePerson = () => {
    const num = data.findIndex((person) => {
      return person.name == updateName;
    });
    if (num != -1) {
      data.splice(num, 1);
    }
    console.log(data);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          padding: 15,
          backgroundColor: "#f2f3f4",
          borderWidth: 1,
          marginBottom: 5,
        }}
      >
        <Text style={{}}>{item.name}</Text>
        <Text>{item.age}</Text>
        <TouchableOpacity
          onPress={() => {
            setName(item.name);
            setAge(item.age);
            setUpdateName(item.name);
            setUpdate(true);
          }}
        >
          <Ionicons name="pencil" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUpdateName(item.name);
            deletePerson();
          }}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {}, [data]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="age"
          onChangeText={setAge}
          value={age}
        />
        {!update ? (
          <TouchableOpacity style={styles.add} onPress={addPerson}>
            <Text style={styles.textAdd}>add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.update} onPress={updatePerson}>
            <Text style={styles.textAdd}>update</Text>
          </TouchableOpacity>
        )}
      </View>
      <Link href="/DetailScreen">About</Link>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: "40%",
    height: 30,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 3,
  },
  add: {
    backgroundColor: "green",
    width: "10%",
    height: 30,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textAdd: {
    color: "white",
  },
  update: {
    backgroundColor: "skyblue",
    width: "15%",
    height: 30,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
