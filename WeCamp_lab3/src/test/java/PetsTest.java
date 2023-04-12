import io.restassured.response.Response;
import models.Pet;
import org.hamcrest.Matchers;
import org.junit.Test;

import io.restassured.RestAssured.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import org.hamcrest.Matchers.*;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertEquals;

public class PetsTest extends TestBase {
    //@test mới đụng tới
    //1 test case chỉ phục vụ 1 api nhưng 1 api test nhiều test case
    //The simplest case of Rest-Assured Usage: simple get and status code verification


//  Again easy assertion for status code in all Pets List
@Test
//get
public void shouldHavePetInTheList() {
    Response response = REQUEST.get("/pets");
    response.then().body("name", hasItem("Azor"));
}

    //  Here we use built in Hamcrest Matcher (more complex) to assert every item has proper user ID
    @Test
    //get pet by user id
    public void shouldHaveProperUserIdInSingleUserPet() {
        Integer userId = 1;
        Response response = REQUEST.get("/user/" + userId + "/pets");
        response.then().body("userId", everyItem(equalTo(userId)));
    }

    //  I extracted some methods to generate Pet, create, update and delete.
//  Now I use them along with JUnit assertions to verify particular fields
    @Test
    //post pet
    public void shouldCreateNewPet() {
        Pet newPet = generatePetForUserId(1);
        Integer petId = createPetAndReturnID(newPet);
        Pet createdPet = getPetWithId(petId);
        assertEquals(createdPet.name, newPet.name);
        assertEquals(createdPet.userId, newPet.userId);
    }

    @Test
    //put pet (by id pet)
    public void shouldUpdateExistingPet() {
        Pet newPet = generatePetForUserId(1);
        Integer petId = createPetAndReturnID(newPet);
        String newName = "newname" + FAKER.crypto().md5();
        newPet.name = newName;
        updatePet(petId, newPet);
        Pet actual = getPetWithId(petId);
        assertEquals(newName, actual.name);
    }

    //  In this case I again use built-in assertions coupled with nice isEmpty() Rest-Assured method
    @Test
    //delete pet by id pet
    public void shouldDeleteCreatedPet() {
        Pet newPet = generatePetForUserId(1);
        Integer petId = createPetAndReturnID(newPet);
        deletePet(petId);
        REQUEST.get("/pets/"+petId).then().body("isEmpty()", Matchers.is(true));
    }

    private Integer createPetAndReturnID(Pet p) {
        return REQUEST.body(p).post("/pets").body().jsonPath().getInt("id");
    }

    private Pet getPetWithId(Integer id) {
        return REQUEST.get("/pets/" + id).as(Pet.class);
    }

    //post pet by user id
    private Pet generatePetForUserId(Integer userId) {
        String uniqueName = FAKER.crypto().md5();
        Integer age = FAKER.number().numberBetween(0, 30);
        return new Pet(userId, uniqueName, age);
    }


    private void updatePet(Integer id, Pet p) {
        REQUEST.body(p).put("/pets/" + id);
    }

    private void deletePet(Integer id) {
        REQUEST.delete("/pets/"+id);
    }
}