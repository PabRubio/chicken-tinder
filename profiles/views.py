from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import ProfileForm, ChickenImageFormSet
from .models import Profile, ChickenImage

@login_required
def edit_profile(request):
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        profile = Profile.objects.create(chicken=request.user)
        profile.save()

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        image_formset = ChickenImageFormSet(
            request.POST, request.FILES, instance=profile)

        if form.is_valid() and image_formset.is_valid():
            form.save()

            instances = image_formset.save(commit=False)
            for instance in instances:
                instance.profile = profile
                instance.save()

            new_image = request.FILES.get('new_image')
            if new_image:
                ChickenImage.objects.create(profile=profile, image=new_image)

            for deleted_object in image_formset.deleted_objects:
                deleted_object.delete()

            messages.success(request, 'Profile updated successfully!')
            return redirect('profiles:profile')
    else:
        form = ProfileForm(instance=profile)
        image_formset = ChickenImageFormSet(instance=profile)

    return render(request, 'settings.html', {'form': form, 'image_formset': image_formset})

@login_required
def view_profile(request):
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        return redirect('profiles:edit_profile')

    return render(request, 'profile.html', {'profile': profile})
