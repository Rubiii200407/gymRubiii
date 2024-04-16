package com.gymruben.es.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gymruben.es.config.ApplicationProperties;
import com.gymruben.es.domain.Comentario;
import com.gymruben.es.domain.Fichero;
import com.gymruben.es.repository.ComentarioRepository;
import com.gymruben.es.repository.FicheroRepository;
import com.gymruben.es.service.dto.FileDTO;
import com.gymruben.es.service.mapper.ClasesOnlineMapper;
import com.gymruben.es.service.mapper.DeportesMapper;
import com.gymruben.es.service.mapper.PlanesEntrenamientoMapper;
import com.gymruben.es.service.mapper.PlanesNutricionMapper;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    private final FicheroRepository ficheroRepository;

    private final DeportesMapper deportesMapper;

    private final ClasesOnlineMapper clasesOnlineMapper;

    private final ComentarioRepository comentarioRepository;
    private final  PlanesEntrenamientoMapper planesEntrenamientoMapper;
    private final PlanesNutricionMapper planesNutricionMapper;
    private final String path;

    public FileStorageService(
        ApplicationProperties applicationProperties,
        FicheroRepository ficheroRepository,
        DeportesMapper deportesMapper,
        ClasesOnlineMapper clasesOnlineMapper,
        PlanesEntrenamientoMapper planesEntrenamientoMapper,
        ComentarioRepository comentarioRepository,
        PlanesNutricionMapper planesNutricionMapper
    ) {
        this.path = applicationProperties.getFileSavepath().getFileSavePathString();

        this.fileStorageLocation = Paths.get(path).toAbsolutePath().normalize();
        this.ficheroRepository = ficheroRepository;
        this.deportesMapper=deportesMapper;
        this.comentarioRepository = comentarioRepository;
        this.clasesOnlineMapper= clasesOnlineMapper;
        this.planesEntrenamientoMapper= planesEntrenamientoMapper;
        this.planesNutricionMapper= planesNutricionMapper;
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();

        try {
            // Check if the filename contains invalid characters
            if (fileName.matches("/([<>*/\\|?:\"])|^(\\.)/gi")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }


    public FileDTO getFileVM(Long fileId) throws IOException {
        Optional<Fichero> fichero = ficheroRepository.findById(fileId);
        Fichero file = fichero.get();
        FileDTO fileVM = new FileDTO();

        fileVM.setContentType(file.getContentType());
        fileVM.setFileName(file.getNombre());
        fileVM.setByteArray(getFile(file));
        fileVM.setBase64(Base64.getEncoder().encodeToString(fileVM.getByteArray()));
        return fileVM;
    }

    public byte[] getFile(Fichero fichero) throws IOException {
        if (null == fichero.getId()) return new byte[0];

        File file = new File(fichero.getPath());
        return Files.readAllBytes(file.toPath());
    }
    public void saveFileComentarioDeporte(Comentario comentario, FileDTO fileVM) throws IOException {
        String name = String.format("%s-%s", fileVM.getFileName(), Instant.now().toEpochMilli());
        String directoryDateName = "DOCUMENTO_DEPORTES";
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = myDateObj.format(myFormatObj);
        File rootPath = new File(path);
        if (!rootPath.exists()) rootPath.mkdir();
        File directoryEmp = new File(String.format("%s/%s", path, "EMPRESA"));
        if (!directoryEmp.exists()) directoryEmp.mkdirs();
        File directory = new File(
            String.format(
                "%s/%s",
                directoryEmp.getAbsolutePath(),
                deportesMapper.toDto(comentario.getDeportes()).getId()
            )
        );
        if (!directory.exists()) directory.mkdirs();
        File subdirectory = new File(String.format("%s/%s", directory.getAbsolutePath(), directoryDateName));
        if (!subdirectory.exists()) subdirectory.mkdirs();
        File subdirectoryid = new File(String.format("%s/%s", subdirectory.getAbsolutePath(), comentario.getDeportes().getId()));
        if (!subdirectoryid.exists()) subdirectoryid.mkdirs();
        File subdirectoryDate = new File(String.format("%s/%s", subdirectoryid.getAbsolutePath(), formattedDate));
        if (!subdirectoryDate.exists()) subdirectoryDate.mkdirs();
        File file = new File(String.format("%s/%s.%s", subdirectoryDate.getAbsolutePath(), name, fileVM.getContentType().split("/")[1]));
        Files.write(Paths.get(file.getPath()), Base64.getDecoder().decode(fileVM.getBase64()));
        Fichero fichero = new Fichero();
        fichero.setContentType(fileVM.getContentType());
        fichero.setNombre(name);
        fichero.setPath(file.getPath());
        fichero.setComentario(comentario);
        ficheroRepository.save(fichero);

    }
    public void saveFileComentarioClase(Comentario comentario, FileDTO fileVM) throws IOException {
        String name = String.format("%s-%s", fileVM.getFileName(), Instant.now().toEpochMilli());
        String directoryDateName = "DOCUMENTO_CLASES";
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = myDateObj.format(myFormatObj);
        File rootPath = new File(path);
        if (!rootPath.exists()) rootPath.mkdir();
        File directoryEmp = new File(String.format("%s/%s", path, "EMPRESA"));
        if (!directoryEmp.exists()) directoryEmp.mkdirs();
        File directory = new File(
            String.format(
                "%s/%s",
                directoryEmp.getAbsolutePath(),
                clasesOnlineMapper.toDto(comentario.getClasesOnline()).getId()
            )
        );
        if (!directory.exists()) directory.mkdirs();
        File subdirectory = new File(String.format("%s/%s", directory.getAbsolutePath(), directoryDateName));
        if (!subdirectory.exists()) subdirectory.mkdirs();
        File subdirectoryid = new File(String.format("%s/%s", subdirectory.getAbsolutePath(), comentario.getClasesOnline().getId()));
        if (!subdirectoryid.exists()) subdirectoryid.mkdirs();
        File subdirectoryDate = new File(String.format("%s/%s", subdirectoryid.getAbsolutePath(), formattedDate));
        if (!subdirectoryDate.exists()) subdirectoryDate.mkdirs();
        File file = new File(String.format("%s/%s.%s", subdirectoryDate.getAbsolutePath(), name, fileVM.getContentType().split("/")[1]));
        Files.write(Paths.get(file.getPath()), Base64.getDecoder().decode(fileVM.getBase64()));
        Fichero fichero = new Fichero();
        fichero.setContentType(fileVM.getContentType());
        fichero.setNombre(name);
        fichero.setPath(file.getPath());
        fichero.setComentario(comentario);
        ficheroRepository.save(fichero);

    }
    public void saveFileComentarioPlan(Comentario comentario, FileDTO fileVM) throws IOException {
        String name = String.format("%s-%s", fileVM.getFileName(), Instant.now().toEpochMilli());
        String directoryDateName = "DOCUMENTO_PLAN";
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = myDateObj.format(myFormatObj);
        File rootPath = new File(path);
        if (!rootPath.exists()) rootPath.mkdir();
        File directoryEmp = new File(String.format("%s/%s", path, "EMPRESA"));
        if (!directoryEmp.exists()) directoryEmp.mkdirs();
        File directory = new File(
            String.format(
                "%s/%s",
                directoryEmp.getAbsolutePath(),
                planesEntrenamientoMapper.toDto(comentario.getPlanesEntrenamiento()).getId()
            )
        );
        if (!directory.exists()) directory.mkdirs();
        File subdirectory = new File(String.format("%s/%s", directory.getAbsolutePath(), directoryDateName));
        if (!subdirectory.exists()) subdirectory.mkdirs();
        File subdirectoryid = new File(String.format("%s/%s", subdirectory.getAbsolutePath(), comentario.getPlanesEntrenamiento().getId()));
        if (!subdirectoryid.exists()) subdirectoryid.mkdirs();
        File subdirectoryDate = new File(String.format("%s/%s", subdirectoryid.getAbsolutePath(), formattedDate));
        if (!subdirectoryDate.exists()) subdirectoryDate.mkdirs();
        File file = new File(String.format("%s/%s.%s", subdirectoryDate.getAbsolutePath(), name, fileVM.getContentType().split("/")[1]));
        Files.write(Paths.get(file.getPath()), Base64.getDecoder().decode(fileVM.getBase64()));
        Fichero fichero = new Fichero();
        fichero.setContentType(fileVM.getContentType());
        fichero.setNombre(name);
        fichero.setPath(file.getPath());
        fichero.setComentario(comentario);
        ficheroRepository.save(fichero);

    }
    public void saveFileComentarioNutricion(Comentario comentario, FileDTO fileVM) throws IOException {
        String name = String.format("%s-%s", fileVM.getFileName(), Instant.now().toEpochMilli());
        String directoryDateName = "DOCUMENTO_NUTRICION";
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = myDateObj.format(myFormatObj);
        File rootPath = new File(path);
        if (!rootPath.exists()) rootPath.mkdir();
        File directoryEmp = new File(String.format("%s/%s", path, "EMPRESA"));
        if (!directoryEmp.exists()) directoryEmp.mkdirs();
        File directory = new File(
            String.format(
                "%s/%s",
                directoryEmp.getAbsolutePath(),
                planesNutricionMapper.toDto(comentario.getPlanesNutricion()).getId()
            )
        );
        if (!directory.exists()) directory.mkdirs();
        File subdirectory = new File(String.format("%s/%s", directory.getAbsolutePath(), directoryDateName));
        if (!subdirectory.exists()) subdirectory.mkdirs();
        File subdirectoryid = new File(String.format("%s/%s", subdirectory.getAbsolutePath(), comentario.getPlanesNutricion().getId()));
        if (!subdirectoryid.exists()) subdirectoryid.mkdirs();
        File subdirectoryDate = new File(String.format("%s/%s", subdirectoryid.getAbsolutePath(), formattedDate));
        if (!subdirectoryDate.exists()) subdirectoryDate.mkdirs();
        File file = new File(String.format("%s/%s.%s", subdirectoryDate.getAbsolutePath(), name, fileVM.getContentType().split("/")[1]));
        Files.write(Paths.get(file.getPath()), Base64.getDecoder().decode(fileVM.getBase64()));
        Fichero fichero = new Fichero();
        fichero.setContentType(fileVM.getContentType());
        fichero.setNombre(name);
        fichero.setPath(file.getPath());
        fichero.setComentario(comentario);
        ficheroRepository.save(fichero);

    }
}


