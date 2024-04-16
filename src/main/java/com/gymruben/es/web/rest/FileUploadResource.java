package com.gymruben.es.web.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hashids.Hashids;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.Comentario;
import com.gymruben.es.domain.Fichero;
import com.gymruben.es.repository.ComentarioRepository;
import com.gymruben.es.responses.UploadResponse;
import com.gymruben.es.service.FicheroService;
import com.gymruben.es.service.FileStorageService;
import com.gymruben.es.service.dto.FileDTO;



@RestController
@RequestMapping("/api")
public class FileUploadResource {

    private final FileStorageService fileStorageService;
    private final FicheroService ficheroService;
    private final Hashids hashids = Constants.HASHIDS;
    private final ComentarioRepository comentarioRepository;

    public FileUploadResource(
        FileStorageService fileStorageService,
        FicheroService ficheroService,
        ComentarioRepository comentarioRepository
    ) {
        this.fileStorageService = fileStorageService;
        this.ficheroService = ficheroService;
        this.comentarioRepository = comentarioRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam(name = "File", required = false) MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        UploadResponse uploadResponse = new UploadResponse(fileName);

        return ResponseEntity.ok().body(uploadResponse);
    }

    @GetMapping(value = "/download/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        Optional<Fichero> archivoTMP = ficheroService.getFichero(id);
        if (archivoTMP.isPresent()) {
            Fichero archivo = archivoTMP.get();
            File f = new File(archivo.getPath());
            InputStreamResource resource = new InputStreamResource(new FileInputStream(f));
            return ResponseEntity.ok().body(resource);
        }
        return ResponseEntity.badRequest().body(null);
    }

 

    @Transactional
    @GetMapping("/upload/{ficheroId}/download-file")
    public ResponseEntity<FileDTO> downloadDocumento(@PathVariable Long ficheroId) throws Exception {
        FileDTO fileVM = fileStorageService.getFileVM(ficheroId);

        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(fileVM, headers, HttpStatus.OK);
    }
    @Transactional
    @PostMapping("/upload/{gestionFicheroId}/comentario-file")
    public ResponseEntity<FileDTO> saveFileComentarioDeporte(@PathVariable Long gestionFicheroId, @RequestBody FileDTO fileVM) throws IOException {
        Optional<Comentario> aux = comentarioRepository.findById(gestionFicheroId);
        Comentario comentario = aux.get();
        fileStorageService.saveFileComentarioDeporte(comentario, fileVM);
        return null;
    }
    @Transactional
    @PostMapping("/upload/{gestionFicheroId}/comentarioClase-file")
    public ResponseEntity<FileDTO> saveFileComentarioClase(@PathVariable Long gestionFicheroId, @RequestBody FileDTO fileVM) throws IOException {
        Optional<Comentario> aux = comentarioRepository.findById(gestionFicheroId);
        Comentario comentario = aux.get();
        fileStorageService.saveFileComentarioClase(comentario, fileVM);
        return null;
    }
    @Transactional
    @PostMapping("/upload/{gestionFicheroId}/comentarioPlan-file")
    public ResponseEntity<FileDTO> saveFileComentarioPlan(@PathVariable Long gestionFicheroId, @RequestBody FileDTO fileVM) throws IOException {
        Optional<Comentario> aux = comentarioRepository.findById(gestionFicheroId);
        Comentario comentario = aux.get();
        fileStorageService.saveFileComentarioPlan(comentario, fileVM);
        return null;
    }
    @Transactional
    @PostMapping("/upload/{gestionFicheroId}/comentarioNutricion-file")
    public ResponseEntity<FileDTO> saveFileComentarioNutricion(@PathVariable Long gestionFicheroId, @RequestBody FileDTO fileVM) throws IOException {
        Optional<Comentario> aux = comentarioRepository.findById(gestionFicheroId);
        Comentario comentario = aux.get();
        fileStorageService.saveFileComentarioNutricion(comentario, fileVM);
        return null;
    }
}
