## Openshift clientin käyttöönotto:
1. https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/
2. lataa linkistä koneellesi sopiva versio
3. Pura kansio
4. Tarkista käskyllä ```"echo $PATH"``` mihin kansioihin voit tallentaa lataamasi kubectl ja oc tiedostot 
    - esim. home/user/bin
    - tallenna tiedostot oc ja kubectl johonkin näistä kansioista.
5. kirjaudu sisään clienttiin käskyllä ```"oc login -u <ktunnus> https://api.ocp-test-0.k8s.it.helsinki.fi:6443/"```
    - käyttäjätunnus on oma koulun käyttäjätunnuksesi
    - salasanasi on oma koulun salasanasi
 6. Onnistuneen kirjautumisen jälkeen oc ilmoittaa mihin projekteihin pääset käsiksi.

## Define route via terminal
First, you should be logged in to client.
1. ```oc get route bikesafe-frontt -o yaml > route.yaml``` Get Route object from bikesafe-frontt project as a yaml, and name save it to route.yaml file.
2. ```oc delete route bikesafe-frontt``` Delete old route from bikesafe-frontt project.
3. Edit your route.yaml -file.
4. ```oc apply -f route.yaml``` Push your edits to Openshift.


## Configuring Docker

1. Install Docker [FROM HERE](https://docs.docker.com/desktop/)
1. If you dont want to use sudos all the time you can add your user to the docker group, which will grant you the necessary permissions.
    ```bash
    sudo usermod -aG docker $USER
    ```
1. Restart your computer so that groups update.
1. Verify that your user is added to the docker group:
    ```bash
    groups
    ```
    - You should see ```docker``` in the list of the groups.
1. After doing this, you should be able to run Docker commands without using sudo.
1. Ensure Docker daemon is running
    ```bash
    docker info
    ```
    - If Docker is not running you can start is by
    ```bash
    sudo systemctl start docker
    ```

## How to use Docker in this project
- 

# KESKEN