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


## Dockerin asentaminen

1. Asenna Docker käyttöjärjestelmäsi ohjeiden mukaisesti
2. Kun 

# KESKEN