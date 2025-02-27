import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Building,
  concordiaBurgendyColor,
  CustomMarkerType,
  LocationType,
} from "@/app/utils/types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useSearch from "@/app/hooks/useSearch"; 

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  buildings: Building[];
  onSelectLocation: (building: Building) => void;
  markers: CustomMarkerType[];
  onPressSelectOnMap: () => void;
  destination: LocationType;
  onGetDirections: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  buildings,
  onSelectLocation,
  markers,
  onPressSelectOnMap,
  destination,
  onGetDirections,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredBuildings,
  } = useSearch({
    data: buildings,
    searchKey: "name", // The key to search by in the Building object
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Destination</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="search" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Search for destination..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          {/* Search Results */}
          <FlatList
            data={filteredBuildings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => {
                  onSelectLocation(item);
                  setSearchQuery(item.name); // Set the selected destination
                }}
              >
                <MaterialIcons name="location-on" size={24} color="#007AFF" />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>{item.name}</Text>
                  <Text style={styles.resultSubtext}>Building Details</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No results found</Text>
            }
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!destination ? (
              <TouchableOpacity
                style={styles.selectOnMapButton}
                onPress={onPressSelectOnMap}
              >
                <MaterialIcons name="map" size={20} color="#fff" />
                <Text style={styles.selectOnMapText}>Select on Map</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.getDirectionsButton}
                onPress={onGetDirections}
              >
                <MaterialIcons name="directions" size={20} color="#fff" />
                <Text style={styles.getDirectionsText}>Get Directions</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultTextContainer: {
    marginLeft: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  resultSubtext: {
    fontSize: 14,
    color: "#888",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  selectOnMapButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    backgroundColor: concordiaBurgendyColor,
    borderRadius: 12,
    elevation: 3,
  },
  selectOnMapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  getDirectionsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#28A745",
    borderRadius: 12,
    elevation: 3,
  },
  getDirectionsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default SearchModal;
